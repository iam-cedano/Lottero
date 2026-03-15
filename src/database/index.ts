import { Pool } from "pg";
import { config } from "@/config";

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);
