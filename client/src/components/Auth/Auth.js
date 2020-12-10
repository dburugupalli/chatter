import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Auth({history}) {

  const [isSignUpActive, setActiveRoute] = useState(false);

  const toggleActiveRoute = () => {
    setActiveRoute(!isSignUpActive);
  }

  return (
    isSignUpActive ? <SignUp history={history} changeActiveRoute={toggleActiveRoute}/> : <SignIn history={history} changeActiveRoute={toggleActiveRoute}/>
  );
}

export default Auth;