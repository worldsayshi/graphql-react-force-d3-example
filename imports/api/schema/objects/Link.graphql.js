const Link = `
  type Link {
    _id: ID
    key: ID
    source: Int
    target: Int
    size: Int
  }
`;

export default () => [Link];
