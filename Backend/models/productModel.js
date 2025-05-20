import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Array, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    bestseller: { type: Boolean },
    newarrival:{type: Boolean},
    hotsales:{type: Boolean},
    date: { type: Number, required: true }
}); 

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
