// pages/api/movies/[id].ts

import { NextApiRequest, NextApiResponse } from "next";

// Sample movie data for demonstration
const movies = [
  {
    _id: "67a5f28767d8f389e6c46e1c",
    name: "Movie Name",
    singer: "Singer Name",
    cast: ["Actor1", "Actor2"],
    releaseDate: "2022-01-01",
    budget: 5000000,
  },
  // Add more movies here...
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Get the movie ID from the URL

  // Handle the GET request
  if (req.method === "GET") {
    const movie = movies.find((movie) => movie._id === id);
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
