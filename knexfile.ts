import { config } from "dotenv";
import type { Knex } from "knex";

config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
  console.error("Error: Database connection credentials are not defined.");
  process.exit(1);
}

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: +DB_PORT!,
    },
    migrations: {
      directory: "./src/Database/Migrations",
    },
    seeds: {
      directory: "./src/Database/Seeds",
    },
    pool: {
      min: 0,
      max: 7,
    },
  },
};

export default knexConfig;
