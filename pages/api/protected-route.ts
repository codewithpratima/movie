import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import authOptions from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json({ message: "Authenticated API route" });
}
