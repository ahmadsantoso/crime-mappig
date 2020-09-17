import React, {
  StrictMode
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  createStore,
  StoreProvider
} from "easy-peasy";
import App from './containers/pages/App/index';
import * as serviceWorker from './serviceWorker';
import {
  storeModel
} from "./easy-peasy/model";

const store = createStore(storeModel);

ReactDOM.render( <
  StoreProvider store = {
    store
  } >
  <
  React.StrictMode >
  <
  App / >
  <
  /React.StrictMode> <
  /StoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();