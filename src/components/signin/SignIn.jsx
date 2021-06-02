import React from "react";
import { signInWithGoogle } from "../../firebase/firebase";
import "./signIn.scss";
function SignIn() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center signin">
      <button className="signin-btn" onClick={signInWithGoogle}>
        Google Sign In
      </button>
    </div>
  );
}

export default SignIn;
