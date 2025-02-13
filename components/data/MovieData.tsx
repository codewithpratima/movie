"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import moment from "moment";

interface Movie {
  _id: string;
  name: string;
  singer: string;
  cast: string[];
  releaseDate: string;
  budget: number;
}

interface Video {
  _id: string;
  videoUrl: string;
  movieId: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);


  useEffect(() => {
    fetchMovies();
    fetchVideos();
  }, []);


  
  // with movei detail will also come

  const { data: session } = useSession();
  
  const fetchVideos = async () => {
    try {
      if (!session) {
        console.log("No active session, skipping fetch");
        return;
      }
  
      const response = await fetch("/api/get-videos", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`, // Ensure token is correct
        },
      });
  
      const data = await response.json();
      console.log("Fetched Video Data:", data);
  
      if (response.ok && Array.isArray(data.videos)) {
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
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 mx-[40%]">Movie List</h1>

      <div className="p-4 flex w-full">
        <ul className="space-y-3 w-[75%]">
          {movies?.map((movie) => (
            <li
              key={movie._id}
              className="border h-[230px] p-4 flex justify-between"
            >
              <h3 className="text-xl font-semibold">
                Movie Name: {movie.name}
              </h3>
              <p>
                <strong>Cast:</strong> {movie.cast.join(", ")}
              </p>
              <p>
                <strong>Singer:</strong> {movie.singer || "N/A"}
              </p>
              <p>
                <strong>Release Date:</strong>
                {moment(movie.releaseDate).format("MMMM DD, YYYY")}
              </p>
              <p>
                <strong>Budget:</strong> {movie.budget}
              </p>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-y-2 w-[25%]">
          {videos?.map((video) => (
            <p key={video._id} className="border p-4">
              <video controls className="w-[95%] h-[200px]">
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </p>
          ))}
        </ul>
      </div>
    </>
  );
}
