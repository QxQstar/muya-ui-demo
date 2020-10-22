import React from 'react';
import App from './App';

import Application from './core/application'

const app = new Application({
  component: <App />,
  rootId: 'root'
})

app
  .init()
  .run()
