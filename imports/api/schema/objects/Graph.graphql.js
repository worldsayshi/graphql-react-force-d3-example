import Link from './Link.graphql';

const Graph = `
  type Graph {
    links: [Link]
  }
`;

export default () => [Graph, Link];
