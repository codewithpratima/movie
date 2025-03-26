import React, { useState, useEffect } from "react";
import moment from "moment";
import Datatable from "react-data-table-component";
import axios from "axios";
import { useRef } from "react";
import dataTableStyles from "../../styles/dataTableStyles";
import { PencilIcon, TrashIcon, XCircleIcon } from "lucide-react";
const DeleteMovie = () => {
  interface Product {
    _id: string;
    name: string;
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
  const [editData, setEditData] = useState<Product | null>(null);
  const [IsProductLoading, setIsProductLoading] = useState(false);
  const fetchProducts = () => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

      showEditDialog();
    } catch (error: any) {
      console.error("Error fetching product data:", error);
      alert("Error fetching product details.");
    }
  };

  const closeEdit = () => {
    setEditData(null);
    editRef.current?.close();
  };

  const showEditDialog = () => {
    editRef.current?.showModal();
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/products?id=${id}`);
      // console.log("Delete response:", res.data); // Add this line

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      fetchProducts();
    } catch (err: any) {
      console.error("Error deleting movie:", err.response?.data || err.message);
      alert(
        `Error deleting movie: ${err.response?.data?.error || err.message}`
      );
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
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY hh:mm A"),
      sortable: true,
      wrap: true,
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updatedAt).format("DD-MM-YYYY hh:mm A"),
      sortable: true,
      wrap: true,
    },
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

  return (
    <div>
      <Datatable
        columns={columns}
        data={products}
        pagination
        paginationServer
        responsive
        customStyles={dataTableStyles}
        progressPending={IsProductLoading}
        // paginationTotalRows={totalRows}
        // onChangePage={handlePageChange}
        // onChangeRowsPerPage={handlePerRowsChange}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
      />
      <div className="flex  justify-center items-center h-screen w-full">
        <dialog ref={editRef} className="rounded-lg shadow-lg bg-white p-6">
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
      </div>
    </div>
  );
};

export default DeleteMovie;
