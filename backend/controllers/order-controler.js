import orderModel from "../models/order-model.js";
import userModel from "../models/user-model.js";
import Stripe from "stripe"

const stripe = new Stripe('sk_test_51PvkHj03XjREp9cDvWVkyW4d9GKlRt3C6uCoIZGT9smw877nKIXrl2lLWuoFVkxtqNJMyL5go9wOIau3S46BkJo5008XOfAWfL')

//place order for frontend
const placeOrder = async (req, res) => {
    const frontendUrl = "https://tomato-food-delivery-vjmy.onrender.com";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            itemId: req.body.items._id,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "delivery charges"
                },
                unit_amount: 100 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occured" })
    }
}

const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Order Placed" });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occured" })
    }
}

//display user orders on frontend 
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occured" })
    }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occured" })
    }
}

//updating the order status in admin panel
const statusUpdate = async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occured" })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, statusUpdate};
