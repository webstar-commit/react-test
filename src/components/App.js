import React from 'react';
import { Route, Switch } from 'react-router-dom';
import index from 'pages';
import modal_a from 'pages/modal-a';
import modal_b from 'pages/modal-b';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path='/' component={index} />
      <Route exact path='/modal_a' component={modal_a} />
      <Route exact path='/modal_b' component={modal_b} />
    </Switch>
  </React.Fragment>
)

export default App
