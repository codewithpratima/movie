"use client";

import { useEffect, useState } from "react";

import DataTable, { TableColumn } from "react-data-table-component";
import React from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";

interface Movie {
  _id: string;
  name: string;
  cast: [string];
  singer: [string];
  budget: string;
  releaseDate: Date;
  videoUrl?: string;
}

const MyDataTable = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const [moviesResponse, videosResponse] = await Promise.all([
        fetch("/api/movies").then((res) => res.json()),
        fetch("/api/get-videos").then((res) => res.json()),
      ]);

      console.log("Movies API Response:", moviesResponse);
      console.log("Videos API Response:", videosResponse);

      if (!Array.isArray(videosResponse)) {
        console.error(
          "videosResponse is not an array. Response:",
          videosResponse
        );
        throw new Error("videosResponse is not an array");
      }

      const mergedData: Movie[] = moviesResponse?.map((movie: Movie) => {
        const video = videosResponse.find((v: any) => v.movieId === movie._id);
        return { ...movie, videoUrl: video?.videoUrl || "" };
      });

      setData(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/movies?id=${id}`);
      console.log("Delete response:", res.data); // Add this line

      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
      fetchData();
    } catch (err: any) {
      console.error("Error deleting movie:", err.response?.data || err.message);
      alert(
        `Error deleting movie: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const handleEdit = (id: string) => {
    console.log("hello");
    router.push(`/edit/${id}`);
  };

  const columns: TableColumn<Movie>[] = [
    {
      name: "Name",
      selector: (row: Movie) => row.name,
      sortable: true,
    },
    {
      name: "Singer",
      selector: (row: Movie) => row.singer.join(", "), // join array to make it a string
      sortable: true,
    },
    {
      name: "Cast",
      selector: (row: Movie) => row.cast.join(", "), // join array to make it a string
      sortable: true,
    },
    {
      name: "Release Date",
      selector: (row: Movie) => new Date(row.releaseDate).toLocaleDateString(), // format date
      sortable: true,
    },
    {
      name: "Budget",
      selector: (row: Movie) => row.budget.toString(), // convert to string if needed
      sortable: true,
    },
    {
      name: "Release Date",
      selector: (row: Movie) => moment(row.releaseDate).format("MMMM DD, YYYY"),
      sortable: true,
    },
    {
      name: "Video",
      cell: (row: Movie) =>
        row.videoUrl ? (
          <video width="200" height="300"className="m-5" controls>
            <source src={row.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <span>No Video Available</span>
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Movies & Videos</h2>
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default MyDataTable;
