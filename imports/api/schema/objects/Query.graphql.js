import Graph from './Graph.graphql';

const Query = `
  # The root query object.
  type Query {
    graph: Graph
  }
`;

export default () => [Query, Graph];
