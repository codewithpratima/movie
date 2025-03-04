"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import React from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { useRouter } from "next/router";
import axios from "axios";
import { XCircleIcon } from "lucide-react";
import { get } from "http";

interface Movie {
  _id: string;
  name: string;
  cast: string[];
  singer: string[];
  budget: string;
  releaseDate: Date;
  videoUrl?: string;
}

const MyDataTable = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const editRef = useRef<HTMLDialogElement>(null);

  const [editData, setEditData] = useState<Movie | null>(null);

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
  async function handleRowClick(id: string) {
    // setIsUpdate(true);
    getEditDataById(id);
    showEditDialog();
  }

  async function getEditDataById(id: string) {
    try {
      const response = await fetch(`/api/movies/${id}`);
      const result: Movie = await response.json(); // Ensure TypeScript knows it's a Movie object

      if (response.ok) {
        setEditData((editData: Movie | null) => ({
          ...editData,
          _id: result._id,
          name: result.name || "",
          cast: result.cast || [],
          singer: result.singer || [],
          budget: result.budget || "",
          releaseDate: result.releaseDate
            ? new Date(result.releaseDate)
            : new Date(),
          videoUrl: result.videoUrl || "",
        }));

        showEditDialog(); // ✅ Open the modal inside `if`
      } else {
        // console.error("Error fetching movie:", result);
      }
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  }

  async function handleUpdate() {
    if (!editData) return; // Ensure editData is not null

    try {
      const response = await fetch(`/api/movies?id=${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        alert("Movie updated successfully!");
        fetchData();
        closeEdit();
      } else {
        console.error("Update failed:", await response.json());
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  }

  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
      }
    });
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
      cell: (row: Movie, index: number) =>
        row.videoUrl ? (
          <video
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            width="200"
            height="300"
            className="m-5 w-full h-[200px] object-cover rounded-2xl
"
            onPlay={() => handlePlay(index)}
            controls
          >
            <source src={row.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <span>No Video Available</span>
        ),
    },
    {
      name: "Actions",
      selector: (row: Movie) => row._id,
      cell: (row: Movie) => (
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

  const showEditDialog = () => {
    editRef.current?.showModal();
  };

  const closeEdit = () => {
    setEditData(null);
    editRef.current?.close();
  };

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
      <dialog ref={editRef} className="rounded-lg shadow-lg bg-white p-6">
        <div className="flex justify-between items-center gap-x-10  ">
          <h1 className="font-bold leading-6 text-gray-500">Edit Movie </h1>
          <button
            onClick={closeEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircleIcon className="h-8 w-8 text-red-500" aria-hidden="true" />
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

            <label className="block mt-3">Singer:</label>
            <input
              type="text"
              value={editData.singer?.join(", ") || ""}
              onChange={(e) =>
                setEditData({ ...editData, singer: e.target.value.split(", ") })
              }
              className="border p-2 w-full"
            />

            <label className="block mt-3">Cast:</label>
            <input
              type="text"
              value={editData.cast?.join(", ") || ""}
              onChange={(e) =>
                setEditData({ ...editData, cast: e.target.value.split(", ") })
              }
              className="border p-2 w-full"
            />

            <label className="block mt-3">Budget:</label>
            <input
              type="text"
              value={editData.budget || ""}
              onChange={(e) =>
                setEditData({ ...editData, budget: e.target.value })
              }
              className="border p-2 w-full"
            />

            <label className="block mt-3">Release Date:</label>
            <input
              type="date"
              value={
                editData.releaseDate
                  ? moment(editData.releaseDate).format("YYYY-MM-DD")
                  : ""
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  releaseDate: new Date(e.target.value),
                })
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
  );
};

export default MyDataTable;
