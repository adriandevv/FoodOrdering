import { Request, Response } from 'express';
import Stripe from "stripe";
import Restaurant, { MenuItemType } from '../models/restaurant';

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
}

const createCheckoutSession = async (req: Request, res: Response) => {
    try {

        const CheckoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(CheckoutSessionRequest.restaurantId);
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }
        const lineItems = createLineItems(CheckoutSessionRequest, restaurant.menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }

}
const createLineItems = (CheckoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    //1. foreach carItem, get the menuItem from the restaurant
    //2. foreach cartItem, convert it to a stripe line item
    //3. return the line array
    const lineItems = CheckoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((menuItem) => menuItem._id.toString() === cartItem.menuItemId.toString());
        if (!menuItem) {
            throw new Error(`Menu Item not found: ${cartItem.menuItemId}`);
        }
        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {

        }
    });

}


export default { createCheckoutSession }