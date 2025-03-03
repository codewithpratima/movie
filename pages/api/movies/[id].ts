
  // Handle the GET request
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import { Movie } from "@/models/Movie";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  dbConnect();
  const { id } = req.query;
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