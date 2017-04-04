import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

export default class Node extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    force: PropTypes.object.isRequired,
  };
  static defaultProps = {

  };
  state = {

  };

  componentDidMount() {
    // console.log('g', this.g);
    if (!this.g) {
      throw new Error('missing ref!');
    }
    const {
      force,
    } = this.props;
    d3.select(this.g)
      .datum(this.props.data)
      .call(selection =>
        selection
          .select('circle')
          .call(force.drag),
      );
  }
  render() {
    const {
      data,
    } = this.props;
    return (
      <g
        className="node"
        ref={g => g && (this.g = g)}
        key={data._id}
        transform={`translate(${data.x}, ${data.y})`}
      >
        <circle
          r={data.size}
          onClick={() => console.log(data._id)}
        />
        <text x={data.size + 5} dy=".35em">{data._id}</text>
      </g>
    );
  }
}
