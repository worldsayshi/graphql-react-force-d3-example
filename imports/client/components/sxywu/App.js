
import React, { Component, PropTypes } from 'react';
import Graph from './Graph';
import randomData from './generate_data';

export default class App extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
  };
  static defaultProps = {
    height: 500,
    width: 960,
  };
  state = {
    nodes: [],
    links: [],
  };

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    const {
      width,
      height,
    } = this.props;
    // randomData is loaded in from external file generate_data.js
    // and returns an object with nodes and links
    const newState = randomData(this.state.nodes, width, height);
    this.setState(newState);
  }

  render() {
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
  }
}
