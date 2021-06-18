import React, { useReducer } from 'react'
import { createBrowserHistory } from 'history';
import { AuthContext } from '../auth/AuthContext'
import reducer from '../reducers'
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Login from '../pages/Login';
import { DashboardRoutes } from './DashboardRoutes';
import { parseJwt } from '../helpers/decodeJWT';

const history = createBrowserHistory();

const init = () => {
  let myUser;
  const myToken  = sessionStorage.getItem("crdt");
  if (myToken === null) {
    myUser = {
      logged: false
    }
  }else{
    const myPayload = parseJwt(myToken)
    myUser = {
      id: myPayload.user_id,
      email: myPayload.email,
      first_name: myPayload.first_name,
      last_name: myPayload.last_name,
      logged: true,
    }
  }
  return myUser;
}

const App = () => {

  const [user, dispatch] = useReducer(reducer, {}, init)

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <BrowserRouter>
        <Router history={history}>
            <Switch>
              <PublicRoute
                exact 
                path="/login" 
                component={Login} 
                isAuthenticated={ user.logged }
              />
              <PrivateRoute
                path="/" 
                component={DashboardRoutes} 
                isAuthenticated={ user.logged }
              />             
            </Switch>
        </Router>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
