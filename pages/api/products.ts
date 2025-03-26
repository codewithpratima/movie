import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import { Product } from "../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch products." });
    }
  } else if (req.method === "POST") {
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

    console.log(req.body, "request body");
    if (
      !name ||
      !category ||
      !quantity?.amount ||
      !quantity?.unit ||
      !purchasePrice ||
      !sellingPrice ||
      !stockAvailable
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newProduct = new Product({
        name,
        category,
        quantity: {
          amount: Number(quantity.amount),
          unit: quantity.unit,
        },
        purchasePrice: Number(purchasePrice),
        sellingPrice: Number(sellingPrice),
        stockAvailable: Number(stockAvailable),
        expiryDate: expiryDate || null,
        dateOfPurchase: dateOfPurchase || null,
        dateOfSale: dateOfSale || null,
      });

      await newProduct.save();
      console.log(newProduct, "newproduct created");
      return res.status(201).json(newProduct);
    } catch (error) {
      console.log(error, "errorr");
      return res.status(500).json({ error: "Failed to create the product" });
    }
  }
  // else if (req.method === "PUT") {
  //   const { id } = req.query;
  //   const { name, singer, cast, releaseDate, budget } = req.body;

  //   if (!id || !name || !cast || !releaseDate || !budget) {
  //     return res.status(400).json({ error: "Missing required fields" });
  //   }

  //   try {
  //     const updatedProduct = await Product.findByIdAndUpdate(
  //       id,
  //       { name, singer, cast, releaseDate, budget },
  //       { new: true }
  //     );

  //     if (!updatedProduct) {
  //       return res.status(404).json({ error: "Product not found" });
  //     }

  //     return res.status(200).json(updatedProduct);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Failed to update the Product" });
  //   }
  // }
  else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete the Product" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
