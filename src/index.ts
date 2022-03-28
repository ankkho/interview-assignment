import * as path from 'path';
import * as fs from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const schemaPublic: string = fs
  .readFileSync(path.resolve(__dirname, './schema/schema.graphql'))
  .toString('utf8');

export const schema: any = makeExecutableSchema({
  resolvers,
  typeDefs: [schemaPublic]
});
