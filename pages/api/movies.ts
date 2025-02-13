import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import { Movie } from "../../models/Movie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch movies." });
    }
  } else if (req.method === "POST") {
    const { name, singer, cast, releaseDate, budget } = req.body;

    if (!name || !cast || !releaseDate || !budget) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newMovie = new Movie({
        name,
        singer,
        cast,
        releaseDate,
        budget,
      });
      await newMovie.save();
      return res.status(201).json(newMovie);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create the movie" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { name, singer, cast, releaseDate, budget } = req.body;

    if (!id || !name || !cast || !releaseDate || !budget) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        id,
        { name, singer, cast, releaseDate, budget },
        { new: true }
      );

      if (!updatedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      return res.status(200).json(updatedMovie);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update the movie" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    try {
      const deletedMovie = await Movie.findByIdAndDelete(id);

      if (!deletedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete the movie" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
