import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../screen/Home.js';
import About from '../screen/About.js';

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
