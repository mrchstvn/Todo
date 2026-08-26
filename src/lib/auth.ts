// Reach into the "better-auth" toolbox and pull out the main tool, betterAuth. Better Auth is a pre-built login system — instead of writing risky security code yourself, you use a trusted, tested tool.
import { betterAuth } from "better-auth";

// An "adapter" is a translator. Better Auth doesn't natively know how to talk to your database — Drizzle does — so this adapter lets the two understand each other.
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Pulls in the tool for talking to Redis, a super-fast temporary notepad (unlike your main database, which is more like a filing cabinet) — used here for things that need to be checked quickly, like sessions.
import { Redis } from "@upstash/redis";

// Imports your live connection to the actual database — the "phone line" your app uses to read and write data.
import { db } from "@/db";

// Imports your database's blueprint: what tables and columns exist (e.g. "users have an email, a password, a name").
import * as schema from "@/db/schema";

// Opens a live connection to the Redis notepad. The url and token are its address and password.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Tells Better Auth: "store data through Drizzle, my database is PostgreSQL (pg), and here's the table blueprint." Without this, Better Auth has nowhere to save new accounts.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schema,
  }),

  // Turns on the classic "sign up with email and password" method.
  emailAndPassword: {
    enabled: true,
    // Optional: Customize the email and password validation rules
    requiredEmailVerification: false, // Set to true if you want to require email verification
  },

  // Enables "Sign in with Google" and "Sign in with GitHub" buttons.
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
    // "If you want to look something up, here's how to check the notepad." async means this action takes a moment, like a phone call, so the code waits for it to finish.
    get: async (key) => await redis.get(key),

    //"If you want to write something down, here's how." If a ttl (time-to-live, an expiration time) is given, the entry disappears automatically after that many seconds (ex means "expire").
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },

    //"If you want to erase something, here's how." This whole block lets Better Auth store fast-changing data — like session tokens — in the quick Redis notepad instead of the slower main database.
    delete: async (key) => {
      await redis.del(key);
    },
  },

  rateLimit: {
    // Turn on rate limiting to prevent abuse of the authentication endpoints
    enabled: true,

    // Use Upstash Redis for rate limiting storage
    storage: "secondary-storage",

    // The time window in seconds and the maximum number of requests allowed in that window
    window: 60, // 1 minute,
    max: 100, // Maximum of 100 requests per window

    // Overrides the default for sensitive actions: only 5 login or signup attempts per minute are allowed. This is what stops someone from rapidly guessing passwords (a "brute-force attack") while normal browsing still gets the higher 100/minute limit.
    customRules: {
      "/sign-in/email": { window: 60, max: 5 }, // 5 requests per minute for email sign-in
      "/sign-up/email": { window: 60, max: 5 }, // 5 requests per minute for email sign-up
    },
  },
});
