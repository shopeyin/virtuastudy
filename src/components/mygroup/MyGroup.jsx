import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase/firebase";

function MyGroup({ currentUser, groups }) {
  const [myGroup, setMyGroup] = useState([]);

  let id = currentUser ? currentUser.id : "";

  const fetchGroup = async () => {
    let myGroupList = [];
    const response = firestore
      .collection("users")
      .doc(id)
      .collection("mygroup");
    const data = await response.get();
    data.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      myGroupList.push({ id, ...data });
    });
    setMyGroup(myGroupList);
  };

  useEffect(() => {
    if (id) {
      fetchGroup();
    }
  }, [id]);
  console.log(myGroup);

  console.log(groups);
  return (
    <div>
      My Group
      {myGroup.map((item) => {
        return (
          <div key={item.id}>
            {item.groupName}{" "}
            <Link to="/viewpost" className="btn btn-secondary">
              View post{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state, "MYGROUP");
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,
    hasErrors: state.group.hasErrors,
  };
};

export default connect(mapStateToProps)(MyGroup);
