

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createNewGroup,
  deleteAdminGroup,
  fetchMyGroup,
  fetchMyMembers,
  JoinGroup,
} from "../../firebase/adminGroup";
import CreatePost from "../post/CreatePost";
import { Link } from "react-router-dom";
import { leaveTheGroup } from "../../firebase/userGroup";
import Group from "./Group";

function CreateGroup({ currentUser }) {
  const [name, setName] = useState("");
  const [myGroup, setMyGroup] = useState([]);
  const [groupAdded, setGroupAdded] = useState(false);
  const [groupLoaded, setGroupLoaded] = useState(false);
  const [members, setMembers] = useState([]);
  const [deleteGroupStatus, setDeleteGroupStatus] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setName({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewGroup(currentUser, name.name);
    setGroupAdded(!groupAdded);

    e.target.reset();
  };

  const fetchGroupMembers = async () => {
    if (myGroup.length) {
      let myMembers = await fetchMyMembers(currentUser, myGroup[0].id);

      setMembers(myMembers);
    }
  };

  const deleteGroup = (groupId) => {
    deleteAdminGroup(groupId);
    setDeleteGroupStatus(!deleteGroupStatus);
    members.length = 0;
  };

  useEffect(() => {
    const fetchGroupCreated = async () => {
      let groupArr = await fetchMyGroup(currentUser);
      setMyGroup(groupArr);
      setGroupLoaded(true);
    };
    fetchGroupCreated();
  }, [currentUser.id, groupAdded, deleteGroupStatus]);

  useEffect(() => {
    let groupId = myGroup.length ? myGroup[0].id : "";
    let groupName = myGroup.length ? myGroup[0].groupName : "";
    if (myGroup.length) {
      JoinGroup(currentUser, groupId, groupName);
      setTimeout(() => fetchGroupMembers(), 3000);
    }
  }, [myGroup]);

  let itemsToRender;
  if (myGroup.length) {
    itemsToRender = myGroup.map((item) => {
      return <Group key={item.id} item={item} deleteGroup={deleteGroup} />;
    });
  } else if (myGroup.length === 0 && groupLoaded) {
    itemsToRender = (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputTitle">Group Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              aria-describedby="TitleHelp"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add group{" "}
          </button>
        </form>
      </div>
    );
  }
  console.log("MEMBERSSS", members, members.length);
  console.log("MYGROUP", myGroup.length);
  return (
    <div>
      <h3>{currentUser ? currentUser.displayName : ""}</h3>
      {itemsToRender}
      {members.map((member) => {
        return (
          <div key={member.id}>
            {member.memberName}--{member.id}
          </div>
        );
      })}
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   setGroup: (group) => dispatch(setGroup(group)),
// });

const mapStateToProps = (state) => {
  console.log(state, "state is here");
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,

    hasErrors: state.group.hasErrors,
  };
};

export default connect(mapStateToProps)(CreateGroup);
