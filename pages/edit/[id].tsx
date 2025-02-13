import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EditMovie = () => {
  const [movie, setMovie] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [singer, setSinger] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [budget, setBudget] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        console.log("No movie ID found in URL");
        return;
      }

      try {
        const res = await axios.get(`/api/movies?id=${id}`);
        console.log(res);
        if (res.status === 200) {
          setMovie(res.data);
          setName(res.data.name);
          setSinger(res.data.singer.join(", "));
          setCast(res.data.cast.join(", "));
          setReleaseDate(res.data.releaseDate);
          setBudget(res.data.budget);
        } else {
          setError("Failed to fetch movie details.");
        }
      } catch (err) {
        setError("Error fetching movie details.");
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  const handleUpdate = async () => {
    const updatedMovie = {
      name,
      singer: singer.split(", "),
      cast: cast.split(", "),
      releaseDate,
      budget,
    };

    try {
      const res = await axios.put(`/api/movies?id=${id}`, updatedMovie);
      if (res.status === 200) {
        router.push("/");
      } else {
        setError("Failed to update movie.");
      }
    } catch (err) {
      setError("Error updating movie.");
    }
  };

  return (
    <div className="mx-3 p-4 bg-white rounded-lg">
      <h1 className="text-xl font-semibold text-blue-900">Edit Movie</h1>
      {error && <div className="text-red-500">{error}</div>}
      {movie ? (
        <div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="singer"
              className="block text-sm font-medium text-gray-700"
            >
              Singer(s)
            </label>
            <input
              type="text"
              id="singer"
              value={singer}
              onChange={(e) => setSinger(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cast"
              className="block text-sm font-medium text-gray-700"
            >
              Cast
            </label>
            <input
              type="text"
              id="cast"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>Loading movie details...</div>
      )}
    </div>
  );
};

export default EditMovie;
