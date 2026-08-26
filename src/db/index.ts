import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// process.env.DATABASE_URL reads the connection string from your
// .env file. The '!' tells TypeScript 'trust me, this will exist'.
const sql = neon(process.env.DATABASE_URL!);

// drizzle(sql) wraps that raw connection with Drizzle's friendly,
// type-safe query builder. From now on, 'db' is what we import
// everywhere else to read/write data.
export const db = drizzle(sql);
