const fs = require('fs');

module.exports = {
  "parser": "babel-eslint",
  "commonjs": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "plugin:meteor/recommended",
  ],
  "settings": {
    "import/resolver": "meteor",
    "import/core-modules": fs.readFileSync('./.meteor/packages', 'utf-8')
      .split('\n')
      .filter(name => name.charAt(0) !=='#')
      .filter(name => name.length > 0)
      .map(name => name.indexOf('@') > -1 ? name.split('@')[0] : name)
      .map(name => 'meteor/' + name)
      .concat(['meteor/meteor']),
  },
  "installedESLint": true,
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
    "sourceType": "module",
    "allowImportExportEverywhere": true,
  },
  "plugins": [
    "react",
    "graphql",
    "meteor",
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 },
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "jsx-a11y/no-static-element-interactions": 0,
    "import/no-unresolved": [
      2, { "ignore": ["^meteor/", "^/"] }
    ],
    "import/no-extraneous-dependencies": 0,
    "react/jsx-filename-extension": [
      1, { "extensions": [".js", ".jsx"] }
    ],
    "forbid-prop-types": [0, { "forbid": [] }],
    "no-underscore-dangle": [
      "error", { "allow": [
        "_ensureIndex",
        "_id",
        "_schemaKeys",
        "__",
        "_typeMap",
      ] }
    ],
    "new-cap": [
      "error", {
        "capIsNewExceptions": [

        ],
        "newIsCapExceptions": [

        ],
      }
    ],
    "prop-types": [
      0, { ignore: [
        "children"
      ] }
    ],
    "no-param-reassign": [
      "error", { "props": false }
    ],
    "react/prefer-stateless-function": [
      1, { "ignorePureComponents": true }
    ],
    "react/forbid-prop-types": [
      1, { "forbid": ["any"] }],
    "no-restricted-syntax": "off"
  },
};
