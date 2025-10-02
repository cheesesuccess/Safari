// app/api/songs/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("➡️ Fetching songs from Prisma...");

    const songs = await prisma.song.findMany();

    if (songs.length === 0) {
      console.warn("⚠️ No songs found in database. Check your Atlas collection and schema.");
    } else {
      console.log("✅ Songs fetched:", songs);
    }

    return new Response(JSON.stringify(songs), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching songs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch songs" }), { status: 500 });
  }
}
