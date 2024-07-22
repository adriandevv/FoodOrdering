import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/restaurant";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);

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

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const CheckoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      CheckoutSessionRequest.restaurantId
    );
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    const lineItems = createLineItems(
      CheckoutSessionRequest,
      restaurant.menuItems
    );
    const session = await createSession(
      lineItems,
      "TEST_ORDER_ID",
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );
    if (!session.url) {
        return res.status(500).json({ message: "Error creating stripe session" });
    }
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

export default { createCheckoutSession };
