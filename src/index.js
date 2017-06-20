import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App, { store } from './App';

/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
