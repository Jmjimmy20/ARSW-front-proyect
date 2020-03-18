import React from 'react';
import './App.css';
import { Route, Switch, Router, Redirect, useLocation } from 'react-router-dom';
import login from './views/login/Login';

import { createBrowserHistory } from 'history';
import Nassistant from './views/nurseAssistant/Nassistant';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
            <Route exact path="/">
              {/* Auth check */ false ? <Redirect to="/main" /> : <Redirect to="/login" />}
            </Route>
            {/* <Route path="/main" component={routes} /> */}
            <Route path="/login" component={login} />
            <Route path="/NurseAssistantBoard" component={Nassistant} /> 
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
