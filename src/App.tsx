import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login";
import {Layout} from "./components/layout";

function App() {
  return (
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
  );
}

export default App;
