import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://akshit07plp:9882227474@cluster0.f157o.mongodb.net/?").then(()=>{console.log("DB Connected")})
}
