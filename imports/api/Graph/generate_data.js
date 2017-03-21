import _ from 'underscore';

function maintainNodePositions(oldNodes, nodes, width, height) {
  const kv = {};
  _.each(oldNodes, (d) => {
    kv[d._id] = d;
  });
  _.each(nodes, (d) => {
    if (kv[d._id]) {
      // if the node already exists, maintain current position
      d.x = kv[d._id].x;
      d.y = kv[d._id].y;
    } else {
      // else assign it a random position near the center
      d.x = (width / 2) + _.random(-150, 150);
      d.y = (height / 2) + _.random(-25, 25);
    }
  });
}

export default function randomData(oldNodes, width, height) {
  // const oldNodes = nodes;
  // generate some data randomly
  let nodes = _.chain(_.range(_.random(10, 30)))
    .map(() => {
      const node = {};
      node._id = _.random(0, 30);
      node.size = _.random(4, 10);

      return node;
    }).uniq(node => node._id).value();

  if (oldNodes) {
    let add = _.initial(oldNodes, _.random(0, oldNodes.length));
    add = _.rest(add, _.random(0, add.length));

    nodes = _.chain(nodes)
      .union(add).uniq(node => node._id).value();
  }

  const links = _.chain(_.range(_.random(15, 35)))
    .map(() => {
      const link = {};
      link.source = _.random(0, nodes.length - 1);
      link.target = _.random(0, nodes.length - 1);
      link._id = `${link.source},${link.target}`;
      link.size = _.random(1, 3);

      return link;
    }).uniq(link => link._id)
    .value();

  maintainNodePositions(oldNodes, nodes, width, height);

  return { nodes, links };
}
