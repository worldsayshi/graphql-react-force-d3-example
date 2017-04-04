import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

export default class Graph extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    nodes: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
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
    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    console.log('next nodes', nextProps.nodes);
    console.log('next links', nextProps.links);
    /* nextProps.links.forEach((link) => {
      console.log(link.target);
      // XXX THis list is immutable!
      link.target = 999;
      console.log(link.target);
    }); */
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
    // use React to draw all the nodes, d3 calculates the x and y
    const renderNodes = nodes.map((node) => {
      const transform = `translate(${node.x}, ${node.y})`;
      return (
        <g
          className="node"
          key={node._id}
          transform={transform}
        >
          <circle r={node.size} />
          <text x={node.size + 5} dy=".35em">{node._id}</text>
        </g>
      );
    });
    const renderLinks = links.map(link => (
      <line
        className="link"
        key={link._id}
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
