import React from "react";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import SignIn from "../signin/SignIn";
function HomePage({ currentUser }) {
  const link = currentUser ? <Profile /> : <SignIn />;

  return <div>{link}</div>;
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(HomePage);
