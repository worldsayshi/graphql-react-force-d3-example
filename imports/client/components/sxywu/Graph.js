import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

export default class Graph extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    nodes: PropTypes.array,
    links: PropTypes.array,
  };
  static defaultProps = {
    nodes: [],
    links: [],
  };

  constructor(props) {
    super(props);
    const {
      width,
      height,
    } = props;
    console.log('this', this);
    console.log('d3', d3);
    this.force = d3.layout.force()
      .charge(-300)
      .linkDistance(50)
      .size([width, height]);
  }
  componentWillMount() {
    this.force.on('tick', () => {
      // after force calculation starts, call
      // forceUpdate on the React component on each tick
      this.forceUpdate();
    });
  }

  componentWillReceiveProps(nextProps) {
    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    this.force.nodes(nextProps.nodes).links(nextProps.links);

    this.force.start();
  }
  render() {
    const {
      width,
      height,
      nodes = [],
      links = [],
    } = this.props;
    // use React to draw all the nodes, d3 calculates the x and y
    const renderNodes = nodes.map((node) => {
      const transform = `translate(${node.x}, ${node.y})`;
      return (
        <g
          className="node"
          key={node.key}
          transform={transform}
        >
          <circle r={node.size} />
          <text x={node.size + 5} dy=".35em">{node.key}</text>
        </g>
      );
    });
    const renderLinks = links.map(link => (
      <line
        className="link"
        key={link.key}
        strokeWidth={link.size}
        x1={link.source.x}
        x2={link.target.x}
        y1={link.source.y}
        y2={link.target.y}
      />));

    return (
      <svg width={width} height={height}>
        <g>
          {renderLinks}
          {renderNodes}
        </g>
      </svg>
    );
  }
}
