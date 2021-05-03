import React from 'react';
import  { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route component={NotFound}></Route>
          </Switch>
      </BrowserRouter>
  );
};

export default App;