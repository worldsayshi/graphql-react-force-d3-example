import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import React, { PropTypes } from 'react';
import Graph from './sxywu/Graph';

const ConnectedApp = () => {
  const {
    width,
    height,
  } = this.props;
  const {
    nodes,
    links,
  } = this.state;
  return (
    <div>
      <div className="update" onClick={() => this.updateData()}>update</div>
      <Graph
        nodes={nodes}
        links={links}
        width={width}
        height={height}
      />
    </div>
  );
};

ConnectedApp.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
ConnectedApp.defaultProps = {

};

export default compose(
  graphql(gql`
      query getGraph() {
        graph {
          nodes
          links
        }
      }
    `, {
    options: ({ params }) => ({
      variables: {
        ...params,
      },
    }),
    props: ({ ownProps, data }) => ({
      ...ownProps,
      ...data,
    }),
  }),
)(ConnectedApp);
