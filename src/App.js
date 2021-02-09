import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-action";

import CreateGroup from "./components/creategroup/CreateGroup";

import createPost from "./components/post/CreatePost";
import MyGroup from "./components/mygroup/MyGroup";
import ViewPost from "./components/viewpost/ViewPost";
import HomePage from "./components/home/HomePage";
import CreatePost from "./components/post/CreatePost";
import { fetchGroups } from "./redux/group/group-action";

function App({ setCurrentUser, fetchGroups }) {
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
    fetchGroups();
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
        <Route path="/mygroup" component={MyGroup} />
        <Route path="/addpost" component={CreatePost} />
        <Route path="/viewpost" component={ViewPost} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchGroups: () => dispatch(fetchGroups()),
});

const mapStateToProps = (state) => {
  console.log(state, "APPPPPPP");
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
