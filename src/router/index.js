import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../screen/Home';
import About from '../screen/About';
import RegisterPage from '../screen/RegisterPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
}
