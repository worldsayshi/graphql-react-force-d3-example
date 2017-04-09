import ApolloClient from 'apollo-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Meteor } from 'meteor/meteor';
import { meteorClientConfig } from 'meteor/apollo';

import graphReducer from '../client/reducers/Graph.reducer';
import App from '../client/components/ConnectedApp';

const render = (Component, div = document.getElementById('app')) => {
  Meteor.startup(() => {
    Meteor.autorun((c) => {
      if (!Meteor.loggingIn()) {
        const div2 = div ? div : document.getElementById('app'); // eslint-disable-line
        ReactDOM.render(<Component />, div2);
        c.stop();
      }
    });
  });
};

const client = new ApolloClient(meteorClientConfig());
const store = createStore(
  combineReducers({
    graph: graphReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

render(() =>
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
);
