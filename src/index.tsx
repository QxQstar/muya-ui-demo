import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import './assets/css/global.scss';
import * as serviceWorker from './serviceWorker';
import App from './App';
import reducers, { goodsSaga } from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware
    )
  );
sagaMiddleware.run(goodsSaga)

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
