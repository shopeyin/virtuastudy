import React from "react";
import { signInWithGoogle } from "../../firebase/firebase";
function SignIn() {
  return (
    <div>
      <button onClick={signInWithGoogle}>signInWithGoogle</button>
    </div>
  );
}

export default SignIn;
