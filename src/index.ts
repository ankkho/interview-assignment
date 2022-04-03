import * as path from 'path';
import * as fs from 'fs';
import { DateTimeResolver, DateResolver } from 'graphql-scalars';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const allResolvers = {
  ...resolvers,
  Date: DateResolver,
  DateTime: DateTimeResolver
};

const schemaPublic: string = fs
  .readFileSync(path.resolve(__dirname, './schema/schema.graphql'))
  .toString('utf8');

export const schema: any = makeExecutableSchema({
  resolvers: allResolvers,
  typeDefs: [schemaPublic]
});
