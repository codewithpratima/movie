"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";

interface Video {
  _id: string;
  videoUrl: string;
  movieId: string;
}

interface RowData {
  _id: string;
  name: string;
  singer: string[];
  cast: string[];
  releaseDate: string;
  budget: number;
}
const AdminPage = () => {
  const [movies, setMovies] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState<Video[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("/api/movies");
        setMovies(res.data);
      } catch (err) {
        setError("Error fetching movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/get-videos");
      const data = await response.json();

      if (response.ok) {
        setVideos(data.videos);
      } else {
        setError(data.error || "Failed to fetch videos");
      }
    } catch (err) {
      setError("Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrancy = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/movies?id=${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (err) {
      console.error("Error deleting movie:", err);
      alert("Error deleting movie. Please try again.");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const columns = [
    {
      name: "Movie Name",
      selector: (row: RowData) => row.name,
      sortable: true,
      wrap: true,
      cell: (row: RowData) => <span className="text-left">{row.name}</span>,
    },
    {
      name: "Singer",
      selector: (row: RowData) => row.singer.join(", "),
      sortable: true,
      cell: (row: RowData) => (
        <span className="text-left">{row.singer.join(", ")}</span>
      ),
    },
    {
      name: "Cast",
      selector: (row: RowData) => row.cast.join(", "),
      sortable: true,
      cell: (row: RowData) => (
        <span className="text-left">{row.cast.join(", ")}</span>
      ),
    },
    {
      name: "Release Date",
      selector: (row: RowData) => moment(row.releaseDate).format("DD-MM-YYYY"),
      sortable: true,
      wrap: true,
      cell: (row: RowData) => (
        <span className="text-left">
          {moment(row.releaseDate).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      name: "Budget",
      sortable: true,
      right: true,
      wrap: true,
      cell: (row: RowData) => (
        <span className="text-left">{formatCurrancy(row.budget)}</span>
      ),
    },
    {
      name: "Actions",
      selector: (row: RowData) => row._id,
      cell: (row: RowData) => (
        <div className="flex flex-col sm:flex-row gap-2 text-xs">
          <button
            className="flex-1 sm:flex-auto min-w-[40px] px-2 py-1 bg-white text-gray-800 rounded-md border border-gray-300
                                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900
                                 transition-colors duration-200 flex items-center justify-center"
            onClick={() => handleEdit(row._id)}
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mx-3 p-4 bg-white rounded-lg">
      <h1 className="text-xl font-semibold text-blue-900">Manage Movies</h1>
      <DataTable
        columns={columns}
        data={movies}
        pagination
        responsive
        progressPending={loading}
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  );
};

export default AdminPage;
