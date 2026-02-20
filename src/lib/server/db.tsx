import { PrismaClient } from '@/src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";


const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString })
const db = new PrismaClient({ adapter })
const globalForPrisma = global as unknown as { prisma: PrismaClient };


if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
export { db };