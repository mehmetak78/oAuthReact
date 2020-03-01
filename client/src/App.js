import React, {Fragment} from 'react';

import './App.css';

import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import PrivateHome from "./components/pages/PrivateHome";
import About from "./components/pages/About";
import AppInit from "./components/routing/AppInit";
import PublicRoute from "./components/routing/PublicRoute";
import PublicHome from "./components/pages/PublicHome.js";

const App = () => {
  return (
      <AuthState>
        <AlertState>
          <Router>
            <Fragment>
              <AppInit/>
              <Navbar/>
              <div className="container">
                <Alerts/>
                <Switch>
                  <PublicRoute exact path='/publichome' component={PublicHome} />
                  <PrivateRoute path='/privatehome' component={PrivateHome} />
                  <Route path='/about' component={About} />
                  <PrivateRoute exact path='/' component={PrivateHome} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </AuthState>
  );
};

export default App;

