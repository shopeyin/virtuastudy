import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Profile from "../profile/Profile";
import SignIn from "../signin/SignIn";
import { firestore, addGroupToUserTable } from "../../firebase/firebase";

function HomePage({ currentUser, groups, loading, hasErrors }) {
  const link = currentUser ? <Profile /> : <SignIn />;
  let id = currentUser ? currentUser.id : "";

  const addGroupToUser = async (name) => {
    addGroupToUserTable(id, name);
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
        addGroupToUser(groupname);
      } catch (err) {
        console.log("error creating users", err.message);
      }
    }
  };

  const renderGroups = () => {
    if (loading) return <p>Loading groups...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;
    return (
      <div>
        {groups.map((item) => {
          return (
            <div key={item.id}>
              {item.groupName}{" "}
              <button onClick={() => JoinGroup(item.id, item.groupName)}>
                Join group
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {link}
      <div>
        <h3>List of Groups</h3>
        <div>{renderGroups()}</div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("HOMEPAGE", state);
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,

    hasErrors: state.group.hasErrors,
  };
};

export default connect(mapStateToProps)(HomePage);
