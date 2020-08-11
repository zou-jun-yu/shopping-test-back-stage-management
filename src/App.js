import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={(routeProps) => <Login {...routeProps} />}
        />
        <Route
          path="/admin"
          render={(routeProps) => <Admin {...routeProps} />}
        />
        <Redirect to="/admin" from="/" />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
