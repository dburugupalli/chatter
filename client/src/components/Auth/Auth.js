import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


function Auth() {

  const [isSignUpActive, setActiveRoute] = useState(false);

  const toggleActiveRoute = () => {
    setActiveRoute(!isSignUpActive);
  }

  return (
    isSignUpActive ? <SignUp changeActiveRoute={toggleActiveRoute}/> : <SignIn changeActiveRoute={toggleActiveRoute}/>
  );
}

export default Auth;