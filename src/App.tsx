import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login";
import {Layout} from "./components/layout";
import ThemeContext, { Theme } from './context/themeContext';

function App(): React.ReactElement {
  const [theme, setTheme] = useState(Theme.Light);
  const toggleTheme = (theme: Theme) => {
      setTheme(theme)
  }
  return (
      <ThemeContext.Provider value={{theme,toggleTheme}}>
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
      </ThemeContext.Provider>
  );
}

export default App;
