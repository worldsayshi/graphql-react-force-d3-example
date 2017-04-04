import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import Node from './Node';

export default class Graph extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    nodes: PropTypes.array.isRequired, // eslint-disable-line
    links: PropTypes.array.isRequired, // eslint-disable-line
  };

  constructor(props) {
    super(props);
    const {
      width,
      height,
    } = props;

    this.force = d3.layout.force()
      .charge(-300)
      .linkDistance(50)
      .size([width, height]);
  }

  state = {
    nodes: [],
    links: [],
  };

  componentWillMount() {
    this.force.on('tick', () => {
      // after force calculation starts, call
      // forceUpdate on the React component on each tick
      this.forceUpdate();
    });
  }

  componentWillReceiveProps(nextProps) {
    const mutableNodes = nextProps.nodes.map(
      ({ _id, key, size }) => ({ _id, key, size }),
    );
    const mutableLinks = nextProps.links.map(
      ({ source, target, _id, key, size }) =>
      ({ source, target, _id, key, size }),
    );
    this.setState({
      nodes: mutableNodes,
      links: mutableLinks,
    });
    this.force.nodes(
      mutableNodes,
    ).links(
      mutableLinks,
    );

    this.force.start();
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
        <svg
          width={width}
          height={height}
          style={{
            userSelect: 'none',
            borderRadius: '1px',
            borderStyle: 'solid',
          }}
        >
          <g>
            {
              links.map(link => (
                <line
                  className="link"
                  key={link._id}
                  strokeWidth={link.size}
                  x1={link.source.x}
                  x2={link.target.x}
                  y1={link.source.y}
                  y2={link.target.y}
                />
              ))
            }
            {
              nodes.map(node => (
                <Node
                  key={node.key}
                  data={node}
                  force={this.force}
                />
              ))
            }
          </g>
        </svg>
      </div>
    );
  }
}
