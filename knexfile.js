import dotenv from 'dotenv';

dotenv.config();

const environments = ['development', 'staging', 'production'];

const connection = {
  host: '127.0.0.1',
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const commonConfig = {
  client: 'pg',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
};

export default Object.fromEntries(environments.map((env) => [env, commonConfig]));
