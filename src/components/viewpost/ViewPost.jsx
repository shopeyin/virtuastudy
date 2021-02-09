import React from "react";
import { connect } from "react-redux";
function ViewPost() {
  return <div>View group post</div>;
}

const mapStateToProps = (state) => {
  console.log(state, "VIEW POST");
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(ViewPost);
