import Link from './Link.graphql';
import Node from './Node.graphql';

const Graph = `
  type Graph {
    links: [Link]
    nodes: [Node]
  }
`;

export default () => [Graph, Link, Node];
