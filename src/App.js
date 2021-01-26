import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-action";
import { signInWithGoogle } from "./firebase/firebase";
function App({ setCurrentUser }) {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user)
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  return (
    <div className="App container">
      Virtua App <button onClick={signInWithGoogle}>signInWithGoogle</button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(App);
