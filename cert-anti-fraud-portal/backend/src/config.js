import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;

export const DB_CONFIG = {
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
};

export const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
