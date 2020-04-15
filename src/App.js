import React from 'react';
import cookie from 'react-cookies';
import './App.css';
import { Route, Switch, Router, Redirect, useLocation } from 'react-router-dom';
import Login from './views/login/Login';

import { createBrowserHistory } from 'history';
import Nassistant from './views/nurseAssistant/Nassistant';
import Nurse from './views/nurse/Nurse';
import Admin from './views/admin/Admin';
//<Route path="/Admin" component={Admin}/>

const history = createBrowserHistory();

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.verificar() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const fakeAuth = {
  token: cookie.load('userToken'),
  verificar(){
    fakeAuth.token = cookie.load('userToken')
    if(!fakeAuth.token){
      return false
    }else{
      return true 
    }
  }
};

function routeAuto(){
  
  var jwtDecode = require('jwt-decode');
  let token = fakeAuth.token;
  if(token){
    let deco = jwtDecode(token);
    if (deco.jti === "ASSISTANT") 
      return "/NurseAssistantBoard"
    else if (deco.jti === "ADMIN")
      return "/Admin"
    else if (deco.jti === "MANAGER")
      return "/Nurse"
    else
      return "/login"
  }
  
}


function App() {
  console.log(fakeAuth.verificar())
  return (
      <div className="App">
        <Router history={history}>
          <Switch>
              <Route exact path="/">
                <Redirect to ={routeAuto()}/>
              </Route>
              {/* <Route path="/main" component={routes} /> */}
            <Route path="/login" component={Login} />
              <PrivateRoute path="/NurseAssistantBoard" >
                <Nassistant history = {history}/>
              </PrivateRoute>
              <PrivateRoute path="/Nurse">  
                <Nurse history = {history}/>
              </PrivateRoute>
              <PrivateRoute path="/Admin">
                <Admin history = {history}/>
              </PrivateRoute> 
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
