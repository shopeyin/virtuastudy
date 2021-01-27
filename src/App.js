import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-action";

import CreateGroup from "./components/creategroup/CreateGroup";

import HomePage from "./components/home/HomePage";
function App({ setCurrentUser, currentUser }) {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  // const link = currentUser ? <Profile /> : <SignIn />;

  return (
    <div className="App container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/creategroup" component={CreateGroup} />
      </Switch>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
