import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://anubhavmishra:83969220120875@cluster0.1k1bu.mongodb.net/food-del").then(()=>{console.log("DB Connected")})
}