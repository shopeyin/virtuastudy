import React from "react";
import { connect } from "react-redux";
import Profile from "../homeprofile/HomeProfile";
import SignIn from "../signin/SignIn";

import "./home.style.scss";

function HomePage({ currentUser }) {
  const homePage = currentUser ? <Profile /> : <SignIn />;
  return <div>{homePage}</div>;
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(HomePage);
