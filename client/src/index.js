import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import auth from './Auth';

import 'tachyons';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: auth.getIdToken(),
      },
    }));
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
