import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
 import {Image} from  "../../../models/Image"

const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const videos = await Image.find(); // Make sure this returns an array
    res.status(200).json(Image); // Correct: Sending an array
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default getImage;
// Compare this snippet from components/movie/AddMovie.tsx:4kl /