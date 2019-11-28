import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import routes from "./routes";
import withTracker from "./withTracker";
import { PDProvider } from "./contexts/PDProvider"


function App() {
  return (
    <Router basename="/test">
      <PDProvider>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </Switch>
      </PDProvider>
    </Router>
  );
}

export default App;
