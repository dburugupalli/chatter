import React, { useEffect, useState, useContext } from "react";
import { Router, Switch, Route, Redirect } from "react-router";
import Home from "./Home";
import Auth from "./components/Auth/Auth";
import { createBrowserHistory } from "history";
import { SessionContext, getSessionCookie } from "./Cookies";
import Cookies from "js-cookie";

const history = createBrowserHistory();

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

const AuthHandler = ({history}) => {
  return <Auth history={history} />;
};

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

const ProtectedHandler = ({ history }) => {
  let cookie = useContext(SessionContext);
  cookie = getSessionCookie();
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

const App = () => (
  <div className="App">
    <Routes />
  </div>
);

export default App;
