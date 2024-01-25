import Knex from 'knex';
import configs from '../../knexfile.js';

export const database = Knex(configs[process.env.NODE_ENV || 'development']);