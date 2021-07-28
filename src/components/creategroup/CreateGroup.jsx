// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";

// import {
//   createNewGroup,
//   deleteTopicAndGroup,
//   fetchMyGroup,
//   fetchMyMembers,
//   JoinGroup,
//   deleteUserTopic,
// } from "../../firebase/adminGroup";
// import CreateTopic from "../topic/CreateTopic";
// import { Link } from "react-router-dom";
// import { leaveTheGroup } from "../../firebase/userGroup";

// import { firestore } from "../../firebase/firebase";
// import { fetchGroupTopic } from "../../redux/topic/topic-action";
// import Group from "./Group";

// function CreateGroup({ currentUser, groupTopic, comments, fetchGroupTopic }) {
//   const [name, setName] = useState("");
//   const [myGroup, setMyGroup] = useState([]);
//   const [groupAdded, setGroupAdded] = useState(false);
//   const [groupLoaded, setGroupLoaded] = useState(false);
//   const [members, setMembers] = useState([]);
//   const [deleteGroupStatus, setDeleteGroupStatus] = useState(false);

//   const [topicLoaded, setTopicLoaded] = useState(false);

//   const handleChange = (e) => {
//     const { value, name } = e.target;
//     setName({
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createNewGroup(currentUser, name.name);
//     setGroupAdded(!groupAdded);
//     e.target.reset();
//   };

//   const fetchGroupMembers = async () => {
//     if (myGroup.length) {
//       let myMembers = await fetchMyMembers(currentUser, myGroup[0].id);

//       setMembers(myMembers);
//     }
//   };

//   const deleteGroup = (column, groupId) => {
//     deleteTopicAndGroup(column, groupId);

//     setDeleteGroupStatus(!deleteGroupStatus);

//     members.length = 0;
//     comments.length = 0;

//     if (groupTopic.length) {
//       deleteTopic("topic", groupTopic[0].id);
//     }
//   };

//   const deleteTopic = (firestoreColumn, groupTopicid) => {
//     deleteTopicAndGroup(firestoreColumn, groupTopicid);
//     comments.length = 0;
//     setDeleteGroupStatus(!deleteGroupStatus);
//   };

//   // useEffect(() => {
//   //   const fetchGroupCreated = () => {
//   //     let group = [];
//   //     if (currentUser.id) {
//   //       firestore
//   //         .collection("group")
//   //         .where("adminId", "==", currentUser.id)
//   //         .get()
//   //         .then((data) => {
//   //           data.docs.forEach((item) => {
//   //             let id = item.id;
//   //             let data = item.data();
//   //             group.push({ id, ...data });
//   //           });
//   //           setMyGroup(group);
//   //         })
//   //         .then(
//   //           () => setGroupLoaded(true),
//   //
//   //           setGroupStatus(true)
//   //         )
//   //         .catch((err) => {
//   //           console.log("ERROR", err.message);
//   //         });
//   //     }
//   //   };

//   //   fetchGroupCreated();

//   //   return () => {
//   //     setMyGroup([]);
//   //   };
//   // }, [currentUser.id, groupAdded, deleteGroupStatus]);

//   const fetchTopicData = async () => {
//     if (myGroup.length && groupLoaded) {
//       await fetchGroupTopic(myGroup[0].adminId);
//       setTopicLoaded(true);
//     }
//   };

//   useEffect(() => {
//     console.log("main component");
//     const fetchGroupCreated = async () => {
//       let group = [];
//       if (currentUser.id) {
//         const data = await firestore
//           .collection("group")
//           .where("adminId", "==", currentUser.id)
//           .get();
//         data.docs.forEach((item) => {
//           let id = item.id;
//           let data = item.data();
//           group.push({ id, ...data });
//         });
//         setMyGroup(group);
//         setGroupLoaded(true);
//       }
//     };
//     fetchGroupCreated();
//     fetchTopicData();
//   }, [currentUser.id, groupAdded, deleteGroupStatus, groupLoaded, topicLoaded]);

//   useEffect(() => {
//     const fetchMembers = async () => {
//       let groupId = myGroup.length ? myGroup[0].id : "";
//       let groupName = myGroup.length ? myGroup[0].groupName : "";
//       if (myGroup.length) {
//         await JoinGroup(currentUser, groupId, groupName);
//         fetchGroupMembers();
//       }
//     };
//     fetchMembers();
//   }, [myGroup]);

//   let itemsToRender;
//   if (groupLoaded && myGroup.length) {
//     itemsToRender = myGroup.map((item) => {
//       return <Group key={item.id} item={item} deleteGroup={deleteGroup} />;
//     });
//   } else if (groupLoaded && myGroup.length === 0) {
//     itemsToRender = (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="exampleInputTitle">Group Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               id="name"
//               aria-describedby="TitleHelp"
//               onChange={handleChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Add group{" "}
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {itemsToRender}

//       <CreateTopic
//         groupLoaded={groupLoaded}
//         groupAdded={groupAdded}
//         myGroup={myGroup}
//         topicLoaded={topicLoaded}
//         deleteTopic={deleteTopic}
//       />
//     </div>
//   );
// }

// const mapDispatchToProps = (dispatch) => ({
//   fetchGroupTopic: (groupAdminId) => dispatch(fetchGroupTopic(groupAdminId)),
// });

// const mapStateToProps = (state) => {
//   console.log(state, "state is here");
//   return {
//     currentUser: state.user.currentUser,
//     groups: state.group.group,
//     loading: state.group.loading,
//     hasErrors: state.group.hasErrors,

//     comments: state.comments.comments,
//     groupTopic: state.topic.groupTopic,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createNewGroup,
  deleteTopicOrGroup,
  fetchMyMembers,
  JoinGroup,
  deleteUserTopic,
  fetchGroupCreated,
} from "../../firebase/adminGroup";
import CreateTopic from "../topic/CreateTopic";
import { Link } from "react-router-dom";
import { leaveTheGroup } from "../../firebase/userGroup";

import { firestore } from "../../firebase/firebase";
import { fetchGroupTopic } from "../../redux/topic/topic-action";
import { fetchMyGroup } from "../../redux/group/group-action";
import Group from "./Group";

function CreateGroup({ currentUser, fetchMyGroup, myGroup }) {
  const [name, setName] = useState("");
  // const [myGroup, setMyGroup] = useState([]);
  const [groupLoaded, setGroupLoaded] = useState(false);
  const [deleteGroupStatus, setDeleteGroupStatus] = useState(false);
  const [groupAdded, setGroupAdded] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setName({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { groupName } = name;
    await createNewGroup(currentUser, groupName);
    setGroupAdded(!groupAdded);
    e.target.reset();
  };

  const deleteGroup = (column, groupId) => {
    deleteTopicOrGroup(column, groupId);

    setDeleteGroupStatus(!deleteGroupStatus);

    // members.length = 0;
    // comments.length = 0;

    // if (groupTopic.length) {
    //   deleteTopic("topic", groupTopic[0].id);
    // }
  };

  const callBack = () => {
    setGroupLoaded(true);
  };

  useEffect(() => {
    fetchMyGroup(currentUser, callBack);
  }, [currentUser, deleteGroupStatus, groupAdded]);
  console.log(groupLoaded);
  console.log(myGroup);
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
              name="groupName"
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
      {itemsToRender}
      <CreateTopic groupLoaded={groupLoaded} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchGroupTopic: (groupAdminId) => dispatch(fetchGroupTopic(groupAdminId)),
  fetchMyGroup: (currentUser, myCallBack) =>
    dispatch(fetchMyGroup(currentUser, myCallBack)),
});

const mapStateToProps = (state) => {
  console.log(state, "state is here");
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,
    hasErrors: state.group.hasErrors,
    myGroup: state.myGroup.myGroup,
    comments: state.comments.comments,
    groupTopic: state.topic.groupTopic,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
