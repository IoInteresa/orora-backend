import knex from "knex";
import { config } from "dotenv";

import knexConfig from "../../knexfile";

config();

export default knex(knexConfig["development"]);
