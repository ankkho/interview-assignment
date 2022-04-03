import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema as schemaPublic } from '.';
import pino from 'express-pino-logger';
import { logger } from './utils';
import { getErrorMessage } from './errors';

const {
  PORT
} = process.env;

const server = new ApolloServer({
  schema: schemaPublic,
  formatError: (err) => {
    const { extensions } = err;
    const { code } = extensions;
    const { message, statusCode } = getErrorMessage(code);

    return {
      message,
      statusCode
    };
  }
});

const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.use(pino);
}

startServer();

app.listen({ port: PORT || 4000 }, () => {
  logger.info(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
