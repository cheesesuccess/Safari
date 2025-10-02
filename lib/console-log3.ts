// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

// ✅ Debug MongoDB connection at startup
async function testConnection() {
  try {
    console.log("🌍 DATABASE_URL =", process.env.DATABASE_URL);

    // Ping MongoDB
    const result = await prisma.$runCommandRaw({ ping: 1 });
    console.log("✅ MongoDB connection successful:", result);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}
testConnection();

export default prisma;
