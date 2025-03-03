import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import { Video } from "../../models/Video";

const getVideos = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default getVideos;
