import mongoose from 'mongoose';
const { Schema } = mongoose;

const foodSchema = new Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String

  })

  const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)


export default foodModel;