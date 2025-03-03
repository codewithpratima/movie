// pages/api/movies/[id].ts

import { Movie } from "@/models/Movie";
import { NextApiRequest, NextApiResponse } from "next";

 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get the movie ID from the URL

  // Handle the GET request
  if (req.method === "GET") {
  const movie = await Movie.findById(id);
    if (!movie) {
      // If the movie is not found, return a 404 error
      return res.status(404).json({ error: "Movie not found" });
    }
    // Return the movie data as JSON
    return res.status(200).json(movie);
  }

  // Handle other methods (PUT, DELETE) if necessary
  // You can extend the API to update (PUT) or delete (DELETE) movies later
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