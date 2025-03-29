import React from "react";
import {
  ArrowUpRightIcon,
  LockClosedIcon,
  XCircleIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "../Chart";
import StatsCard from "../general/StatsCard";
import { useRef } from "react";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const editRef = useRef<HTMLDialogElement>(null);
  const [totalProfit, setTotalProfit] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [allProducts, setAllProducts] = useState<[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const products = await res.json();

        setTotalProducts(products.length);

        const lowStockCount = products.filter(
          (item: any) => item.stockAvailable < 3
        ).length;
        setLowStock(lowStockCount);

        const allProducts = products.filter(
          (item: any) => item.stockAvailable < 3
        );
        setAllProducts(allProducts);

        const supplierCount = products.filter(
          (item: any) => item.supplierName
        ).length;
        setSupplierCount(supplierCount);

        const outOfStock = products.filter(
          (item: any) => item.stockAvailable === 0
        ).length;
        setOutOfStock(outOfStock);

        const totalProfit = products.reduce((total: number, product: any) => {
          const profitPerUnit = product.sellingPrice - product.purchasePrice;
          return total + profitPerUnit;
          // * product.stockAvailable
        }, 0);

        setTotalProfit(totalProfit);

        console.log("Total Profit:", totalProfit); // For debugging
        setTotalProfit(totalProfit);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    console.log(outOfStock);
    fetchProducts();
  }, []);

  async function handleCardClick() {
    console.log("hello");
    showDialog();
  }
  const closeEdit = () => {
    editRef.current?.close();
  };

  const showDialog = () => {
    editRef.current?.showModal();
  };

  return (
    <div className="min-h-screen bg-[#0a1727] p-8">
      <h1 className="text-white text-2xl mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard
            title="Total Products"
            value={totalProducts}
            icon={<LockClosedIcon />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />

          <StatsCard
            title="Low Stock"
            value={lowStock}
            icon={<ArrowUpRightIcon />}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-500"
            valueColor="text-yellow-600"
            onClick={handleCardClick}
          />

          <StatsCard
            title="Out of Stock"
            value={outOfStock}
            icon={<XCircleIcon />}
            iconBgColor="bg-red-100"
            iconColor="text-red-500"
            valueColor="text-red-600"
          />

          <StatsCard
            title="Suppliers"
            value={supplierCount}
            icon={<UserGroupIcon />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />

          <StatsCard
            title="Profit ₹"
            value={totalProfit}
            icon={<UserGroupIcon />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
        </div>
        <Chart />
      </div>

      <dialog
        ref={editRef}
        className="rounded-lg shadow-lg bg-white p-6 w-[500px] fixed inset-0 m-auto max-w-full max-h-full overflow-auto"
      >
        <div className="flex justify-between items-center gap-x-10 w-full">
          <h1 className="font-bold leading-6 text-gray-500">Product Info</h1>
          <button
            onClick={closeEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircleIcon className="h-8 w-8 text-red-500" aria-hidden="true" />
          </button>
        </div>
        {allProducts?.map((product: any) => (
          <div key={product._id} className="p-4 border rounded-md shadow-sm">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">
              Stock Available: {product.stockAvailable}
            </p>
            <p className="text-gray-600">Supplier: {product.supplierName}</p>
          </div>
        ))}
      </dialog>
    </div>
  );
};

export default Dashboard;
