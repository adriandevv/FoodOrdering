import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("restaurant").populate("user");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
    

    if (!orderId) {
      return res.status(400).json({ message: "Order Id not found" });
    }

    // Assuming Order is a Mongoose model, you might need to import it and define its type
    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.totalAmount = session.amount_total;
    order.status = "paid";
    await order.save();
  }

  res.status(200).send();
}

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const CheckoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      CheckoutSessionRequest.restaurantId
    );
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    const newOrder = new Order({
      restaurant:restaurant,
      user:req.userId,
      status:"placed",
      deliveryDetails:CheckoutSessionRequest.deliveryDetails,
      cartItems:CheckoutSessionRequest.cartItems,
      createdAt: new Date(),
    })
    const lineItems = createLineItems(
      CheckoutSessionRequest,
      restaurant.menuItems
    );
    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );
    if (!session.url) {
        return res.status(500).json({ message: "Error creating stripe session" });
    }
    await newOrder.save();
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: { amount: deliveryPrice, currency: "usd" },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${process.env.FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });
  return sessionData;
};

const createLineItems = (
  CheckoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  //1. foreach carItem, get the menuItem from the restaurant
  //2. foreach cartItem, convert it to a stripe line item
  //3. return the line array
  const lineItems = CheckoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (menuItem) => menuItem._id.toString() === cartItem.menuItemId.toString()
    );
    if (!menuItem) {
      throw new Error(`Menu Item not found: ${cartItem.menuItemId}`);
    }
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };
    return line_item;
  });
  return lineItems;
};

export default { createCheckoutSession, stripeWebhookHandler, getMyOrders };
