import Query from './objects/Query.graphql';
import Mutation from './objects/Mutation.graphql';

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [
  SchemaDefinition,
  Query,
  Mutation,
];
