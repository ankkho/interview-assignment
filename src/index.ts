import * as path from 'path';
import * as fs from 'fs';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const allResolvers = {
  ...resolvers,
  Date: GraphQLDate,
  DateTime: GraphQLDateTime
};

const schemaPublic: string = fs
  .readFileSync(path.resolve(__dirname, './schema/schema.graphql'))
  .toString('utf8');

export const schema: any = makeExecutableSchema({
  resolvers: allResolvers,
  typeDefs: [schemaPublic]
});
