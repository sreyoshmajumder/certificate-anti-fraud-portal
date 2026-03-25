import pkg from "pg";
import { DB_CONFIG } from "./config.js";

const { Pool } = pkg;

export const pool = new Pool(DB_CONFIG);

export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    console.log("Connected to Postgres");
  } finally {
    client.release();
  }
}
