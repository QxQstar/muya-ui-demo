import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login";
import {Layout} from "./components/layout";
import ThemeContext, { Theme } from './context/themeContext';
import {  DockNew as Dock } from '@qunhe/tools-ui-pro'

function App(): React.ReactElement {
  const [theme, setTheme] = useState(Theme.Light);
  const toggleTheme = (theme: Theme) => {
      setTheme(theme)
  }
  return (
      <ThemeContext.Provider value={{theme,toggleTheme}}>
          <Dock>
          <Dock.Container
              dockId="left-container"
            //   snapDirection="right"
              mode='col'
              style={{position: 'absolute', right: 0, top: '55px'}}
            />
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
          </Dock>
      </ThemeContext.Provider>
  );
}

export default App;
