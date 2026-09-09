// db client — shared mysql2 pool + drizzle instance.
// Uses a POOL (not a single connection): drizzle's mysql2 driver reads
// `pool.config`, and pools also survive concurrent SSR requests.
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2"; // callback client — drizzle calls .promise() itself
import { config } from "dotenv";

config({ path: ".env" });

export const db = drizzle({
  client: mysql.createPool({
    host: process.env.DATABASE_HOST || "event-feedback-bytefoundry.i.aivencloud.com",
    port: Number(process.env.DATABASE_PORT) || 11918,
    database: process.env.DATABASE_NAME || "defaultdb",
    user: process.env.DATABASE_USER || "avnadmin",
    password: process.env.DATABASE_PASSWORD || "",
    ssl: { rejectUnauthorized: false }, // Aiven serves self-signed certs
    connectionLimit: 10,
  }),
});

import { events, feedback } from "./schema";

export { events, feedback };