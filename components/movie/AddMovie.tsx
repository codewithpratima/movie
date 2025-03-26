"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: {
      amount: "",
      unit: "",
    },
    purchasePrice: "",
    sellingPrice: "",
    stockAvailable: "",
    expiryDate: "",
    dateOfPurchase: "",
    dateOfSale: "",
    supplierName: "",
    customerName: "",
  });

  const router = useRouter();
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => {
      // Handle nested quantity fields
      if (name.startsWith("quantity.")) {
        const key = name.split(".")[1]; // "amount" or "unit"
        return {
          ...prev,
          quantity: {
            ...prev.quantity,
            [key]: type === "number" && value !== "" ? Number(value) : value,
          },
        };
      }

      // Handle all other fields, including category
      return {
        ...prev,
        [name]: type === "number" && value !== "" ? Number(value) : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          quantity: {
            amount: Number(form.quantity.amount), // Ensure it's a number
            unit: form.quantity.unit,
          },
          purchasePrice: Number(form.purchasePrice),
          sellingPrice: Number(form.sellingPrice),
          stockAvailable: Number(form.stockAvailable),
          expiryDate: form.expiryDate || null,
          dateOfPurchase: form.dateOfPurchase,
          dateOfSale: form.dateOfSale || null,
        }),
      });

      if (!productRes.ok) throw new Error("Failed to add movie.");
      const productData = await productRes.json();
      setMessage("Data added successfully!");
      window.location.reload();
    } catch (error: any) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      quantity: { ...prev.quantity, unit: value },
    }));
  };

  return (
    <div className=" top-0 netflix-bg h-full w-full bg-[url('https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW52ZW50b3J5JTIwdHJhY2tpbmclMjBncmFwaHxlbnwwfHwwfHx8MA%3D%3D')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 z-0">
        <div className="flex justify-center items-center h-screen w-full">
          <div className="p-4 max-w-lg bg-white">
            <h1 className="text-2xl font-bold mb-4">Add Products</h1>

            <form onSubmit={handleSubmit} className="space-y-3 z-1">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 w-full"
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Spices">Spices</option>
                <option value="Grains">Grains</option>
                <option value="Electrical">Electrical</option>
                <option value="Toys">Toys</option>
                <option value="Snacks">Snacks</option>
              </select>

              {/* Quantity */}
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="quantity.amount"
                  value={form.quantity.amount}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="border p-2 w-1/2"
                  required
                />
                <input
                  type="number"
                  name="stockAvailable"
                  value={form.stockAvailable}
                  onChange={handleChange}
                  placeholder="Stock Available"
                  className="border p-2 w-full"
                  required
                />
                <select
                  name="quantity.unit"
                  value={form.quantity.unit}
                  onChange={handleSelectChange} // ✅ Now correctly typed
                  className="border p-2 w-1/2"
                  required
                >
                  <option value="" disabled>
                    Select Unit
                  </option>
                  <option value="Kg">Kg</option>
                  <option value="Liters">Liters</option>
                  <option value="Packets">Packets</option>
                  <option value="Pieces">Pieces</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="purchasePrice"
                  value={form.purchasePrice}
                  onChange={handleChange}
                  placeholder="Purchase Price (CP)"
                  className="border p-2 w-full"
                  required
                />

                <input
                  type="number"
                  name="sellingPrice"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  placeholder="Selling Price (SP)"
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex">
                <label id="expiryDate" className=" w-[200px]">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex my-2">
                <label id="purchaseDate w-[25%]" className="w-[200px]">
                  {" "}
                  Date of Purchase
                </label>

                <input
                  id="purchaseDate"
                  type="date"
                  name="dateOfPurchase"
                  value={form.dateOfPurchase}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="flex">
                <label id="sellingDate" className="w-[200px]">
                  Date of sale
                </label>
                <input
                  id="sellingDate"
                  type="date"
                  name="dateOfSale"
                  value={form.dateOfSale}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 py-3 text-white p-2 w-full"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>

            {message && (
              <p className="mt-3 text-center text-green-500">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
