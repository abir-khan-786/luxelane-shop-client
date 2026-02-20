import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../server/db";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql", // এখানে postgresql দিতে হবে
    }),
    // ... বাকি সেটিংস
});
