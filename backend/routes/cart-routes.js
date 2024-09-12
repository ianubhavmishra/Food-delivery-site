import express from 'express'
import { addToCart,removeFromCart,fetchCart } from '../controllers/cartControllers.js'

const cartRouter = express.Router();

cartRouter.post('/add',addToCart)
cartRouter.post('/remove',removeFromCart)
cartRouter.post('/fetch',fetchCart)


export default cartRouter;