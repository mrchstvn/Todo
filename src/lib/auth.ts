import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Redis } from "@upstash/redis";
import { db } from "@/db"; //drizzle instance
import * as schema from "@/db/schema"; //drizzle schema
