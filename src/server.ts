import 'dotenv/config';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { schema as schemaPublic } from '.';
import pino from 'express-pino-logger';
import { logger } from './utils';

const server = new ApolloServer({ schema: schemaPublic, introspection: true });
const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.use(pino);
}

startServer();

app.listen({ port: 4000 }, () => {
  logger.info(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
