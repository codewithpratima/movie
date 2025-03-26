import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { Product } from "@/models/Product";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "PUT") {
    const { id } = req.query;
    const {
      name,
      category,
      quantity,
      purchasePrice,
      sellingPrice,
      stockAvailable,
      expiryDate,
      dateOfPurchase,
      dateOfSale,
    } = req.body;

    // if (!name || !sellingPrice || !purchasePrice || !quantity) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          category,
          quantity,
          purchasePrice,
          sellingPrice,
          stockAvailable,
          expiryDate,
          dateOfPurchase,
          dateOfSale,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update the Product" });
    }
  }
}
