import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createNewGroup,
  deleteTopicAndGroup,
  fetchMyGroup,
  fetchMyMembers,
  JoinGroup,
  deleteUserTopic,
} from "../../firebase/adminGroup";
import CreateTopic from "../topic/CreateTopic";
import { Link } from "react-router-dom";
import { leaveTheGroup } from "../../firebase/userGroup";

import { firestore } from "../../firebase/firebase";
import { fetchTopics } from "../../redux/topic/topic-action";
import Group from "./Group";

function CreateGroup({ currentUser, fetchTopics, topics }) {
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

  const deleteGroup = (column, groupId) => {
    deleteTopicAndGroup(column, groupId);
    setDeleteGroupStatus(!deleteGroupStatus);
    members.length = 0;
    if (topics.length) {
      deleteTopic("topic", topics[0].id);
    }
  };

  const deleteTopic = (firestoreColumn, topicid) => {
    deleteTopicAndGroup(firestoreColumn, topicid);
    setDeleteGroupStatus(!deleteGroupStatus);
  };

  // useEffect(() => {
  //   const fetchGroupCreated =  () => {
  //     let group = [];
  //     if (currentUser.id) {
  //       firestore
  //         .collection("group")
  //         .where("adminId", "==", currentUser.id)
  //         .get()
  //         .then((data) => {
  //           data.docs.forEach((item) => {
  //             let id = item.id;
  //             let data = item.data();
  //             group.push({ id, ...data });
  //           });
  //           setMyGroup(group);
  //         })
  //         .then(() => setGroupLoaded(true))
  //         .catch((err) => {
  //           console.log("ERROR", err.message);
  //         });
  //     }
  //   };

  //   fetchGroupCreated();

  //   return () => {
  //     setMyGroup([]);
  //   };
  // }, [currentUser.id, groupAdded, deleteGroupStatus]);

  useEffect(() => {
    const fetchGroupCreated = async () => {
      let group = [];
      if (currentUser.id) {
        const data = await firestore
          .collection("group")
          .where("adminId", "==", currentUser.id)
          .get();
        data.docs.forEach((item) => {
          let id = item.id;
          let data = item.data();
          group.push({ id, ...data });
        });

        setMyGroup(group);
        setGroupLoaded(true);
      }
    };
    fetchGroupCreated();
    fetchTopics(currentUser);
  }, [currentUser.id, groupAdded, deleteGroupStatus]);

  useEffect(() => {
    const fetchMembers = async () => {
      let groupId = myGroup.length ? myGroup[0].id : "";
      let groupName = myGroup.length ? myGroup[0].groupName : "";
      if (myGroup.length) {
        await JoinGroup(currentUser, groupId, groupName);
        fetchGroupMembers();
      }
    };
    fetchMembers();
  }, [myGroup]);

  let itemsToRender;
  if (groupLoaded && myGroup.length) {
    itemsToRender = myGroup.map((item) => {
      return <Group key={item.id} item={item} deleteGroup={deleteGroup} />;
    });
  } else if (groupLoaded && myGroup.length === 0) {
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
  return (
    <div>
      <h3></h3>
      {itemsToRender}
      <CreateTopic
        groupLoaded={groupLoaded}
        myGroup={myGroup}
        deleteTopic={deleteTopic}
      />

      <h3>Members</h3>
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

const mapDispatchToProps = (dispatch) => ({
  fetchTopics: (currentUser) => dispatch(fetchTopics(currentUser)),
});

const mapStateToProps = (state) => {
  console.log(state, "state is here");
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,
    hasErrors: state.group.hasErrors,

    topics: state.topic.topics,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
