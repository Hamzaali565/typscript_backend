import { model, Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  active: boolean;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

const productModel = model<IProduct>("product", productSchema);

export { productModel };
