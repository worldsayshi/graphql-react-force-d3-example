import { createApolloServer } from 'meteor/apollo';
import schema from '../api/schema';

createApolloServer({
  graphiql: true,
  pretty: true,
  schema,
});
