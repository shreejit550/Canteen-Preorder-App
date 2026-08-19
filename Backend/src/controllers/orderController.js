import { Order } from "../models/orderModel.js";
import { User } from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_URL = "https://easy-serve-frontend.vercel.app";
    try {
        const newOrder = new Order({
            canteenId: req.body.canteenId,
            userId: req.body.userId,
            items: req.body.orderData.items,
            amount: req.body.orderData.amount,
            address: req.body.orderData.address,
            timeSlot: req.body.orderData.address.timeSlot
        });
        await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.orderData.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charge" },
                unit_amount: 200
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder };
