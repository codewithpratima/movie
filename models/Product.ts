import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  supplierName: string;
  category: "Spices" | "Grains" | "Electrical" | "Toys" | "Snacks";
  quantity: {
    amount: number;
    unit: "Kg" | "Liters" | "Packets" | "Pieces";
  };
  purchasePrice: number;
  sellingPrice: number;
  stockAvailable: number;
  expiryDate?: Date;
  dateOfPurchase: Date;
  dateOfSale?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    supplierName: { type: String, required: true },
    category: {
      type: String,
      enum: ["Spices", "Grains", "Electrical", "Toys", "Snacks"],
      required: true,
    },
    quantity: {
      amount: { type: Number, required: true },
      unit: {
        type: String,
        enum: ["Kg", "Liters", "Packets", "Pieces"],
        required: true,
      },
    },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockAvailable: { type: Number, required: true },
    expiryDate: { type: Date, default: null },
    dateOfPurchase: { type: Date, required: true },
    dateOfSale: { type: Date, default: null },
  },
  { timestamps: true }
);

// ✅ Named export
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
