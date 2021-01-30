import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import SignIn from "../signin/SignIn";
import { firestore, fetchGroup } from "../../firebase/firebase";
function HomePage({ currentUser }) {
  const [groups, setGroups] = useState([]);
  const link = currentUser ? <Profile /> : <SignIn />;
  let id = currentUser ? currentUser.id : "";
  useEffect(() => {
    const fetchAllGroup = async () => {
      let groupList = [];
      await firestore
        .collection("groupy")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.data());
            let id = doc.id;
            let data = doc.data();
            groupList.push({ id: id, data: data });
          });
          setGroups(groupList);
        });
    };
    fetchAllGroup();
  }, []);

  const addGroupToUser = async (name) => {
    const memberRef = firestore
      .collection("users")
      .doc(id)
      .collection("mygroup")
      .doc();

    const snapShot = await memberRef.get();

    if (!snapShot.exists) {
      const joined = new Date();

      try {
        await memberRef.set({
          groupName: name,
          joined,
        });
        console.log("added to user members list");
      } catch (err) {
        console.log("error creating users", err.message);
      }
    }
  };

  const JoinGroup = async (groupid, groupname) => {
    if (!currentUser) {
      return;
    }

    const memberRef = firestore
      .collection("groupy")
      .doc(groupid)
      .collection("members")
      .doc(id);

    const snapShot = await memberRef.get();

    if (!snapShot.exists) {
      const { displayName, id } = currentUser;

      const joined = new Date();

      try {
        await memberRef.set({
          memberId: id,
          memberName: displayName,
          joined,
        });
        console.log("joined");
        console.log("GROUP HERE OO", groupname);
        addGroupToUser(groupname)
      } catch (err) {
        console.log("error creating users", err.message);
      }
    }
  };

  console.log(groups);
  console.log(id);
  return (
    <div>
      {link}
      <div>
        <h3>List of Groups</h3>
        {groups.map((group) => {
          return (
            <div key={group.id}>
              {group.data.groupName} ------------ {group.data.adminName}{" "}
              <button onClick={() => JoinGroup(group.id, group.data.groupName)}>
                Join group
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(HomePage);
