import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { Session } from "../../../types/session"; // Adjust the path as needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      // Cast to unknown first, then cast to the Session type
      const decoded = verify(
        token,
        process.env.JWT_SECRET as string
      ) as unknown;

      // Now cast it to the correct type
      const session = decoded as Session;

      // If successful, return the session data
      return res.status(200).json({ user: session.user });
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
