import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { maintainNodePositions } from '../../api/Graph/generate_data';
import Graph from './Graph';

const ConnectedApp = ({
  width,
  height,
  graph: {
    nodes,
    links,
  },
}) => {
  console.log('nodes', nodes);
  console.log('links', links);
  return (
    <div>
      <div className="update" onClick={() => this.updateData()}>update</div>
      <Graph
        nodes={nodes || []}
        links={links || []}
        width={width}
        height={height}
      />
    </div>
  );
};

ConnectedApp.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  graph: PropTypes.shape({
    nodes: PropTypes.array,
    links: PropTypes.array,
  }).isRequired,
};
ConnectedApp.defaultProps = {
  height: 500,
  width: 960,
};

export default compose(
  connect(({ graph }) => ({ graph })),
  graphql(gql`
      query getGraph {
        graph {
          links {
            _id
            key
            source
            target
            size
          }
          nodes {
            _id
            key
            size
          }
        }
      }
    `, {
      options: ({ params }) => ({
        variables: {
          ...params,
        },
      }),
      props: ({ ownProps, data: { graph = {} } }) => ({
        ...ownProps,
        graph: {
          nodes: maintainNodePositions(
            ownProps.graph,
            graph.nodes,
            ownProps.width,
            ownProps.height,
          ),
          links: graph.links,
        },
      }),
    }),
)(ConnectedApp);
