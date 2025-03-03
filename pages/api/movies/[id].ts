<<<<<<< HEAD
// pages/api/movies/[id].ts

import { Movie } from "@/models/Movie";
import { NextApiRequest, NextApiResponse } from "next";

 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get the movie ID from the URL

  // Handle the GET request
=======
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
const movies = [
  {
    _id: "67a5f28767d8f389e6c46e1c",
    name: "Movie Name",
    singer: "Singer Name",
    cast: ["Actor1", "Actor2"],
    releaseDate: "2022-01-01",
    budget: 5000000,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  dbConnect();
  const { id } = req.query;
>>>>>>> d9a3a4883fdabd3dae90c806ae9c190721d8e418
  if (req.method === "GET") {
  const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json(movie);
  }
}

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   dbConnect();
//   const { id } = req.query;
//   if (req.method === "GET") {
//     const movie = movies.find((movie) => movie._id === id);
//     if (!movie) {
//       return res.status(404).json({ error: "Movie not found" });
//     }

//     return res.status(200).json(movie);
//   }
// }