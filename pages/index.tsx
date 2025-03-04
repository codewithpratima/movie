"use client";

import Link from "next/link";
import Image from "next/image";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { TableColumn } from "react-data-table-component";
import React from "react";

import moment from "moment";
import { useRouter } from "next/router";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to my website",
  description: "Description of my website",
};

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
      console.log("Merged Data:", mergedData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handlePrice = () => {
    router.push("/price");
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
  const carouselRef = useRef<HTMLDivElement>(null);
  // const scroll = (direction: "left" | "right") => {
  //   if (carouselRef.current) {
  //     const scrollAmount = 400; // Adjust for faster scrolling
  //     carouselRef.current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };


  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 1338; // Adjusted for better scrolling
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  // const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
  //   if (carouselRef.current) {
  //     event.preventDefault();
  //     carouselRef.current.scrollLeft += event.deltaY * 2; // Adjust multiplier for speed
  //   }
  // };

  return (
    <div className="relative">
      <div className="relative w-full h-screen bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg" // Replace with your image path
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
          <button
            className="mt-5 bg-red-600 text-white px-6 py-3 text-lg font-bold rounded hover:bg-red-700"
            onClick={() => handlePrice()}
          >
            Restart Your Membership
          </button>
        </div>
      </div>

      <div className="ml-20 mr-20">
        <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[85%] -translate-y-1/2 bg-black/50 p-3 rounded-full z-10"
        >
          ◀
        </button>


        <div
  ref={carouselRef}
  className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
  // onWheel={(e) => {
  //   e.preventDefault();
  //   carouselRef.current?.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
  // }}
>
  <div className="flex gap-4 flex-nowrap">
    {data?.map((movie: Movie, index) => (
      <div
        key={index}
        className="flex flex-col min-w-[300px] w-[300px] gap-2 h-auto snap-center"
      >
        <video className="w-full h-[200px] object-cover rounded-2xl" controls>
          <source src={movie.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div>
          <h1>{movie.name}</h1>
          <p>{movie.singer[0]}</p>
          <p>{movie.cast[0]}</p>
          <p>{moment(movie.releaseDate).format("MMMM DD, YYYY")}</p>
        </div>
      </div>
    ))}
  </div>
</div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[85%] -translate-y-1/2 bg-black/50 p-3 rounded-full z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default MyDataTable;
