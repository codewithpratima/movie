import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Assuming the API returns an array of products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Prepare data for the chart
  const chartData = {
    labels: products.map((product) => product.name), // Product names as labels
    datasets: [
      {
        label: "Selling Price ($)",
        data: products.map((product) => product.sellingPrice), // Selling prices as data points
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Selling Prices",
      },
    },
  };

  return (
    <div className="w-full ">
      <h1>Product List</h1>

      {/* Render the Bar Chart */}
      <div style={{ marginTop: "40px" }} className="w-[70%] h-450px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProductList;
