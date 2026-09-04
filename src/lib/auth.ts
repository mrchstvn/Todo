import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import * as schema from "@/db/auth-schema"; // your drizzle schema
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },

  secondaryStorage: {
    // ✅ lowercase "s"
    get: async (key: string) => await redis.get(key),
    set: async (key: string, value: string, ttl?: number) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    delete: async (key: string) => {
      await redis.del(key);
    },
    increment: async (key: string, ttl?: number) => {
      const count = await redis.incr(key);
      if (ttl) await redis.expire(key, ttl);
      return count;
    },
  },

  rateLimit: {
    enabled: true,
    storage: "secondary-storage",
    max: 5,
    window: 60,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 }, // 5 requests per minute for email sign-in
      "/sign-up/email": { window: 60, max: 5 }, // 5 requests per minute for email sign-up
    },
  },
});
