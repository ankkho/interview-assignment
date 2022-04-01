import fs from 'fs';
import { logger } from '../src/utils';
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;

const config = {
  development: {
    username: 'user',
    password: 'password',
    database: 'db',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: `${DB_USERNAME}`,
    password: `${DB_PASSWORD}`,
    database: `${DB_NAME}`,
    use_env_variable: 'DATABASE_URL',
    host: `${DB_HOST}`,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

fs.appendFile(
  `${__dirname}/config.json`,
  `${JSON.stringify(config)}`,
  'utf8',
  (err) => {
    if (err) {
      logger.error(err);
    }
  }
);

export default config;
