import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/global.scss';
import { Layout } from './components/layout';
import { Login } from "./pages/login";
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route path='/login'>
                  <Login/>
              </Route>
              <Route path='/'>
                  <Layout/>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
