"use client";

import Link from "next/link";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { TableColumn } from "react-data-table-component";
import React from "react";

import moment from "moment";
import { useRouter } from "next/router";

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
  const { data: session } = useSession();

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth");
  };

  const [data, setData] = useState<Movie[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [language, setLanguage] = useState("English");

  const [error, setError] = useState("");

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

  const columns: TableColumn<Movie>[] = [
    {
      name: "Movie Name",
      selector: (row: Movie) => row.name,
      sortable: true,
    },
    {
      name: "Singer",
      selector: (row: Movie) => row.singer.join(", "),
      sortable: true,
    },
    {
      name: "Cast",
      selector: (row: Movie) => row.cast.join(", "),
      sortable: true,
    },
    {
      name: "Release Date",
      selector: (row: Movie) => new Date(row.releaseDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Budget",
      selector: (row: Movie) => row.budget.toString(),
      sortable: true,
    },
    {
      name: "Release Date",
      selector: (row: Movie) => moment(row.releaseDate).format("MMMM DD, YYYY"),
      sortable: true,
    },
  ];
  const carouselRef = useRef(null);

  return (
    <div className="relative">
      <div className="relative w-full h-screen bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/netbg.jpg" // Replace with your image path
            alt="Netflix Background"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <nav className="absolute top-0 left-0 w-full flex justify-between p-5 z-10">
          <Link href="/">
            <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
          </Link>
          <div className="flex items-center gap-4">
            <select
              className="bg-black text-white px-4 py-2 border border-gray-500 rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
            </select>

            {session ? (
              <>
                <p className="text-white">Welcome, {session.user?.name}!</p>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleSignIn()}
              >
                Login
              </button>
            )}
          </div>
        </nav>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-4xl font-bold">
            Unlimited movies, TV shows and more
          </h2>
          <p className="text-lg mt-2">Starts at ₹149. Cancel at any time.</p>
          <button className="mt-5 bg-red-600 text-white px-6 py-3 text-lg font-bold rounded hover:bg-red-700">
            Restart Your Membership
          </button>
        </div>
      </div>

      <div className="ml-20 mr-20">
        <h2 className="text-xl font-semibold mb-4">Trending Now</h2>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth"
        >
          {data?.map((movie) => (
            <video
              width="200"
              height="400"
              className="object-cover rounded-2xl"
              controls
            >
              <source src={movie.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDataTable;
