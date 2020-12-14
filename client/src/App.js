/**
 * Component responsible for holding entire Application
 * This included Sidebar, Home Feed, Widgets, Auth
 */
import React, { useEffect, useState, useContext } from "react";
import { Router, Switch, Route, Redirect } from "react-router";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { createBrowserHistory } from "history";
import { SessionContext, getSessionCookie } from "./utils/Cookies";
import Cookies from "js-cookie";

// History to store user Browsing, helps for maintaining 
// visited link stack
const history = createBrowserHistory();

// All application routes
const Routes = () => {
  const [session] = useState(getSessionCookie());
  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <Switch>
          <Route exact path={"/auth"} component={AuthHandler} />
          <Route path="/logout" component={LogoutHandler} />
          <Route path="/home" component={ProtectedHandler} />
          <Route exact path="/" render={props => <Redirect to="/auth" />} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
};

// Helper Function to handle Auth Routes (SignIn & Register)
const AuthHandler = ({history}) => {
  return <Auth history={history} />;
};

// Helper Function to handle LogOut Route
export const LogoutHandler = ({ history }) => {
  useEffect(
    () => {
      Cookies.remove("session");
      history.push("/auth");
    },
    [history]
  );
  return null;
};

// Helper Function to handle Protected route (/home)
const ProtectedHandler = ({ history }) => {
  let cookie = useContext(SessionContext);
  cookie = getSessionCookie();
  // check if user is authenticated
  if (cookie.username === undefined) {
    history.push("/auth");
    return null;
  } else {
    return (
      <div>
        <Home userInfo={cookie} />
      </div>
    );
  }
};

// Root Function for entire Application
const App = () => (
  <div className="App">
    <Routes />
  </div>
);

export default App;
