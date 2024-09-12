import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food-routes.js";
import userRouter from "./routes/user-routes.js";
import cartRouter from "./routes/cart-routes.js";
import orderRouter from "./routes/order-routes.js";
import 'dotenv/config.js'
import authMiddleware from "./middleware/auth.js";


//app config
const app = express()
const port = process.env.PORT || 4000

//middelware
 
app.use(express.json())
app.use(cors())
 
//db connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",authMiddleware,cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
   res.send("api working") 
})


app.listen(port, () => {
   console.log(`server listening at http://localhost:${port}`)
})
