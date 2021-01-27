import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../firebase/firebase";

function Profile({ currentUser }) {
  //   console.log(
  //     firestore
  //       .collection("users")
  //       .doc("N4F53uTvEpgUJOgAwtr1QD5RRz33")
  //       .collection("group")
  //       .doc("69UmXYVuydWxbJ2Pgl3x")
  //   );

  return (
    <div>
      Profile {currentUser.displayName}
      <button onClick={() => auth.signOut()}>SIGNOUT</button>
      <Link to="/creategroup">CREATE GROUP</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Profile);
