import React, { useState, useEffect } from "react";
import moment from "moment";
import Datatable from "react-data-table-component";
import axios from "axios";
import { useRef } from "react";
import dataTableStyles from "../../styles/dataTableStyles";
import { PencilIcon, TrashIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/router";
const DeleteMovie = () => {
  interface Product {
    _id: string;
    name: string;
    supplierName: string;
    category: string;
    quantity: {
      amount: number;
      unit: string;
    };
    purchasePrice: number;
    sellingPrice: number;
    stockAvailable: number;
    expiryDate?: string;
    dateOfPurchase?: string;
    dateOfSale?: string;
    createdAt: string;
    updatedAt: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const editRef = useRef<HTMLDialogElement>(null);
  const AddRef = useRef<HTMLDialogElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [editData, setEditData] = useState<Product | null>(null);
  const [IsProductLoading, setIsProductLoading] = useState(false);
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      quantity: { ...prev.quantity, unit: value },
    }));
  };

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
    console.log("submittning");
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
          supplierName: form.supplierName,
          category: form.category,
          quantity: {
            amount: Number(form.quantity.amount), // Ensure it's a number
            unit: form.quantity.unit,
          },
          purchasePrice: Number(form.purchasePrice),
          sellingPrice: Number(form.sellingPrice),
          stockAvailable: Number(form.stockAvailable),
          expiryDate: form.expiryDate || null,
          dateOfPurchase: form.dateOfPurchase || null,
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/products?search=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);
  async function handleRowClick(id: string) {
    // setIsUpdate(true);
    getEditDataById(id);
    showEditDialog();
  }

  const getEditDataById = async (id: string) => {
    try {
      const productRes = await fetch(`/api/products/${id}`);
      if (!productRes.ok) throw new Error("Failed to fetch product data.");

      const editData = await productRes.json();
      setEditData(editData);
    } catch (error: any) {
      console.error("Error fetching product data:", error);
      alert("Error fetching product details.");
    }
  };

  const closeEdit = () => {
    setEditData(null);
    editRef.current?.close();
  };

  const closeEditt = () => {
    AddRef.current?.close();
  };

  const showEditDialog = () => {
    editRef.current?.showModal();
  };
  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Do you really want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/products?id=${id}`);

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        fetchProducts();
      } catch (err: any) {
        console.error(
          "Error deleting product:",
          err.response?.data || err.message
        );
        alert(
          `Error deleting product: ${err.response?.data?.error || err.message}`
        );
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const columns: {
    name: string;
    selector: (row: Product) => string | number;
    sortable: boolean;
    wrap: boolean;
    cell?: (row: Product) => JSX.Element;
  }[] = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      cell: (row) => <span className="text-left">{row.name}</span>,
    },
    {
      name: "Supplier Name",
      selector: (row) => row.supplierName,
      sortable: true,
      wrap: true,
      cell: (row) => <span className="text-left">{row.supplierName}</span>,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      wrap: true,
    },
    {
      name: "Quantity",
      selector: (row) => `${row.quantity.amount} ${row.quantity.unit}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Purchase Price",
      selector: (row) => row.purchasePrice,
      sortable: true,
      wrap: true,
      cell: (row) => <span>{`₹${row.purchasePrice}`}</span>,
    },
    {
      name: "Selling Price",
      selector: (row) => row.sellingPrice,
      sortable: true,
      wrap: true,
      cell: (row) => <span>{`₹${row.sellingPrice}`}</span>,
    },
    {
      name: "Stock Available",
      selector: (row) => row.stockAvailable,
      sortable: true,
      wrap: true,
    },
    {
      name: "Expiry Date",
      selector: (row) =>
        row.expiryDate ? moment(row.expiryDate).format("DD-MM-YYYY") : "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Date of Purchase",
      selector: (row) =>
        row.dateOfPurchase
          ? moment(row.dateOfPurchase).format("DD-MM-YYYY")
          : "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Date of Sale",
      selector: (row) =>
        row.dateOfSale ? moment(row.dateOfSale).format("DD-MM-YYYY") : "N/A",
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Created At",
    //   selector: (row) => moment(row.createdAt).format("DD-MM-YYYY hh:mm A"),
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Updated At",
    //   selector: (row) => moment(row.updatedAt).format("DD-MM-YYYY hh:mm A"),
    //   sortable: true,
    //   wrap: true,
    // },
    {
      name: "Actions",
      sortable: true,
      wrap: true,
      selector: (row: Product) => row._id,
      cell: (row: Product) => (
        <div className="flex flex-col sm:flex-row gap-2 text-xs">
          <button
            className="flex-1 sm:flex-auto min-w-[40px] px-2 py-1 bg-white text-gray-800 rounded-md border border-gray-300
                               hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900
                               transition-colors duration-200 flex items-center justify-center"
            onClick={() => handleRowClick(row._id)}
          >
            <PencilIcon className="mr-1 text-green-500 h-7 w-8" />
          </button>

          <button
            className="flex-1 sm:flex-auto min-w-[40px] px-2 py-1 bg-white text-gray-800 rounded-md border border-gray-300
                               hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900
                               transition-colors duration-200 flex items-center justify-center"
            onClick={() => handleDelete(row._id)}
          >
            <TrashIcon className="mr-1 text-red-500 h-8 w-8" />
          </button>
        </div>
      ),
    },
  ];

  async function handleUpdate() {
    console.log("updating...");
    if (!editData) return;
    const id = editData._id;
    try {
      const response = await fetch(`/api/put?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        fetchProducts();
        closeEdit();
      } else {
        console.error("Update failed:", await response.json());
      }
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  }
  async function handleClick(id: string) {
    showAddDialog();
  }
  const showAddDialog = () => {
    AddRef.current?.showModal();
  };
  return (
    <div className="">
      <div className="w-full justify-between flex mt-10 text-blue-900">
        <h1 className="font-extrabold text-2xl  ">Product Detail...</h1>
        <div className="flex gap-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 w-[200px] ocus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleClick}
            className="bg-blue-800 text-center  hover:bg-blue-800 text-white text-sm px-4  py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>

      <Datatable
        subHeader
        columns={columns}
        data={products}
        pagination
        paginationServer
        responsive
        highlightOnHover
        customStyles={dataTableStyles}
        progressPending={IsProductLoading}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
      />

      <div className="flex  justify-center items-center h-screen w-full">
        <dialog
          ref={editRef}
          className="rounded-lg shadow-lg bg-white p-6 w-[500px] fixed inset-0 m-auto max-w-full max-h-full overflow-auto"
        >
          <div className="flex justify-between items-center gap-x-10  ">
            <h1 className="font-bold leading-6 text-gray-500">Edit Product </h1>
            <button
              onClick={closeEdit}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircleIcon
                className="h-8 w-8 text-red-500"
                aria-hidden="true"
              />
            </button>
          </div>
          {editData && (
            <form>
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Category:</label>
              <input
                type="text"
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Quantity:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={editData.quantity?.amount || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      quantity: {
                        ...editData.quantity,
                        amount: Number(e.target.value),
                      },
                    })
                  }
                  className="border p-2 w-1/2"
                />
                <input
                  type="text"
                  value={editData.quantity?.unit || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      quantity: { ...editData.quantity, unit: e.target.value },
                    })
                  }
                  className="border p-2 w-1/2"
                />
              </div>

              <label className="block mt-3">Purchase Price:</label>
              <input
                type="number"
                value={editData.purchasePrice || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    purchasePrice: Number(e.target.value),
                  })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Selling Price:</label>
              <input
                type="number"
                value={editData.sellingPrice || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    sellingPrice: Number(e.target.value),
                  })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Stock Available:</label>
              <input
                type="number"
                value={editData.stockAvailable || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    stockAvailable: Number(e.target.value),
                  })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Expiry Date:</label>
              <input
                type="date"
                value={
                  editData.expiryDate
                    ? moment(editData.expiryDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) =>
                  setEditData({ ...editData, expiryDate: e.target.value })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Date of Purchase:</label>
              <input
                type="date"
                value={
                  editData.dateOfPurchase
                    ? moment(editData.dateOfPurchase).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) =>
                  setEditData({ ...editData, dateOfPurchase: e.target.value })
                }
                className="border p-2 w-full"
              />

              <label className="block mt-3">Date of Sale:</label>
              <input
                type="date"
                value={
                  editData.dateOfSale
                    ? moment(editData.dateOfSale).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) =>
                  setEditData({ ...editData, dateOfSale: e.target.value })
                }
                className="border p-2 w-full"
              />

              {/* Save & Cancel Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={closeEdit}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </dialog>

        <dialog
          ref={AddRef}
          className="rounded-lg shadow-lg bg-white p-6 w-[500px] fixed inset-0 m-auto max-w-full max-h-full overflow-auto"
        >
          <div className="flex justify-between items-center gap-x-10  ">
            <h1 className="font-bold leading-6 text-gray-500">Add Product </h1>
            <button
              onClick={closeEditt}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircleIcon
                className="h-8 w-8 text-red-500"
                aria-hidden="true"
              />
            </button>
          </div>
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
              <input
                name="supplierName"
                value={form.supplierName}
                onChange={handleChange}
                placeholder="Supplier Name"
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
        </dialog>
      </div>
    </div>
  );
};

export default DeleteMovie;
