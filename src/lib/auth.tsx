import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./server/prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: "http://localhost:3000",
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER", // ডিফল্ট রোল
                input: false, // ইউজার নিজে যেন সাইনআপের সময় রোল সেট করতে না পারে
            },
        },
    },

});