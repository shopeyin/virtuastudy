import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase";
function MyGroup({ currentUser }) {
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
      myGroupList.push({ id: id, data: data });
    });
    setMyGroup(myGroupList);
  };

  useEffect(() => {
    if (id) {
      fetchGroup();
    }
  }, [id]);
  console.log(myGroup);
  console.log("HERE OO");

  return (
    <div>
      My Group
      {myGroup.map((item) => {
        return <div key={item.id}>{item.data.groupName}</div>;
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(MyGroup);
