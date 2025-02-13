// pages/api/auth/_log.ts
import { NextApiRequest, NextApiResponse } from "next";

interface LogData {
  message: string;
  level: string; // e.g., "info", "error"
  timestamp: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const logData: LogData = req.body;

    // You can save this log data to a file, a logging service, or a database
    console.log("Received log data:", logData);

    return res.status(200).json({ message: "Log received successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
