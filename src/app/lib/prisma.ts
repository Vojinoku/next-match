import { PrismaClient } from "@prisma/client";

// FOR PRODUCTION TO PREVENT CREATING NEW PRISMA CLIENT ON EVERY APP RESTART

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
