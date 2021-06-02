import "./App.css";
import React, { useEffect, Suspense, useState } from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-action";

import HomePage from "./components/home/HomePage";

function App({ setCurrentUser }) {
  const [userAvailable, setUserAvailable] = useState(false);
  let unsubscribeFromAuth = null;

  useEffect(() => {
    console.log("APP USER CALLED");
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
      setUserAvailable(true);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return <div className="App ">{userAvailable  ? <HomePage /> : ""}</div>;
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = (state) => {
  console.log(state, "APPPPPPP");
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
