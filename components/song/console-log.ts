// pages/api/songs.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("➡️ Fetching songs from Prisma...");

      const songs = await prisma.song.findMany();

      if (songs.length === 0) {
        console.warn("⚠️ No songs found in database. Check your Atlas collection and schema.");
      } else {
        console.log("✅ Songs fetched:", songs);
      }

      res.status(200).json(songs);
    } catch (error) {
      console.error("❌ Error fetching songs:", error);
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
