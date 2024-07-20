import { config } from 'dotenv';
import knex from 'knex';

import knexConfig from '../../knexfile';

config();

export default knex(knexConfig['development']);
