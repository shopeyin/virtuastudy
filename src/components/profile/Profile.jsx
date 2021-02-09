import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../firebase/firebase";
import { signOut } from "../../redux/user/user-action";

function Profile({ currentUser, dispatch }) {
  // let signO = () => {
  //   auth.signOut();
  //   console.log("I as clicked");
  // };
  console.log(currentUser);
  return (
    <div>
      Profile {currentUser.displayName}
      <button onClick={() => auth.signOut()}>SIGNOUT</button>
      <Link to="/creategroup">CREATE GROUP</Link>
      <Link to="/mygroup">MY GROUP</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Profile);
