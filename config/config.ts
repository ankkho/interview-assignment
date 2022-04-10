import dotenv from 'dotenv';

dotenv.config();

import fs from 'fs';
import { logger } from '../src/utils';
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const configFilePath = `${__dirname}/config.json`;

const config = {
  development: {
    username: `${DB_USERNAME}` || '',
    password: `${DB_PASSWORD}` || '',
    database: `${DB_NAME}` || '',
    host: `${DB_HOST}` || '',
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
    username: `${DB_USERNAME}` || '',
    password: `${DB_PASSWORD}` || '',
    database: `${DB_NAME}` || '',
    host: `${DB_HOST}` || '',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

const createNewFile = () => {
  fs.appendFile(
    configFilePath,
    `${JSON.stringify(config)}`,
    'utf8',
    (error) => {
      if (error) {
        logger.error(error);
      }
      logger.info('config.json file has been created');
    }
  );
};

fs.stat(configFilePath, (_, status) => {
  if (status) {
    fs.unlink(configFilePath, (err) => {
      if (err) {
        logger.error('config.json file was not deleted');
      }
      logger.info('config.json file was deleted');
    });
  }
  createNewFile();
});

export default config;
