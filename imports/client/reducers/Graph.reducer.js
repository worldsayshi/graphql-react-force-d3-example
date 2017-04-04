import { maintainNodePositions } from '../../api/Graph/generate_data';

const graphReducer = (state = { nodes: [], links: [] }, action) => {
  if (action.type === 'GRAPH_FROM_SERVER') {
    return {
      nodes: maintainNodePositions(state, action.graph.nodes, action.width, action.heigth),
      links: action.graph.links,
    };
  }
  return state;
};

export default graphReducer;
