import express from "express"
import { listOrders, placeOrder, statusUpdate, userOrders, verifyOrder } from "../controllers/order-controler.js"
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/orders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",statusUpdate);

export default orderRouter; 