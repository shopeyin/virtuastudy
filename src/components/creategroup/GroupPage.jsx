import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase";
import { fetchGroupTopic } from "../../redux/topic/topic-action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createNewGroup,
  deleteTopicAndGroup,
  fetchMyGroup,
  fetchMyMembers,
  JoinGroup,
  deleteUserTopic,
} from "../../firebase/adminGroup";
import ViewComment from "../comment/ViewComments";
import { leaveGroup } from "../../firebase/userGroup";

function GroupPage({ id, currentUser, fetchGroupTopic, groupTopic }) {
  const [group, setGroup] = useState([]);
  const [members, setMembers] = useState([]);
  const [groupLoaded, setGroupLoaded] = useState(false);
  // const [groupTopic, setGroupTopic] = useState("");

  const history = useHistory();

  const routeChange = () => {
    history.push(`/`);
  };

  const fetchGroupMembers = async () => {
    let myMembers = await fetchMyMembers(currentUser, id);
    setMembers(myMembers);
  };

  React.useEffect(() => {
    const fetchGroupCreated = () => {
      firestore
        .collection("group")
        .doc(id)

        .get()
        .then((doc) => {
          if (doc.exists) {
            setGroup(doc.data());
            setGroupLoaded(true);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    fetchGroupCreated();
    fetchGroupMembers();

    fetchGroupTopic(group.adminId);
  }, [groupLoaded]);

  console.log(groupTopic);

  return (
    <div>
      <button
        onClick={() => {
          leaveGroup(id, currentUser);
          routeChange();
        }}
      >
        Leave group
      </button>
      <h3>Joined Group -----{group.groupName}</h3>
      <h3>ADMIN NAME -----{group.adminName}</h3>
      {/* <h3>TOPIC NAME -----{topics.length ? topics[0].title : ""}</h3> */}
      <h3>TOPIC NAME -----{groupTopic.length ? groupTopic[0].title : ""}</h3>
      <h3>MEMBERS OF THE GROUP</h3>
      {members.map((member) => {
        return <div key={member.id}>{member.memberName}</div>;
      })}

      {/* {topics.length ? <ViewComment /> : ""} */}
      {groupTopic.length ? <ViewComment groupAdminId={group.adminId} /> : ""}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchGroupTopic: (groupAdminId) => dispatch(fetchGroupTopic(groupAdminId)),
});

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  console.log(state, "state is here");
  return {
    id: id,
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,
    hasErrors: state.group.hasErrors,
    groupTopic: state.topic.groupTopic,

    comments: state.comments.comments,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
