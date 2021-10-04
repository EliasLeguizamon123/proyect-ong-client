import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../screen/Home';
import About from '../screen/About';

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
      </Switch>
    </BrowserRouter>
  );
}
