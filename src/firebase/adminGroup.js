import { firestore, addGroupToUserTable } from "./firebase";
export const createNewGroup = (userAuth, name) => {
  if (!userAuth) return;

  let groupRef = firestore
    .collection("group")
    .add({
      groupName: name,
      adminName: userAuth.displayName,
      adminId: userAuth.id,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  return groupRef;
};

const addGroupToUser = async (userAuthid, name, groupId) => {
  addGroupToUserTable(userAuthid, name, groupId);
};

export const JoinGroup = async (userAuth, groupid, groupname) => {
  if (!userAuth) {
    return;
  }

  const memberRef = firestore
    .collection("group")
    .doc(groupid)
    .collection("members")
    .doc(userAuth.id);

  const snapShot = await memberRef.get();

  if (!snapShot.exists) {
    const { displayName, id } = userAuth;

    const joined = new Date();

    try {
      await memberRef.set({
        memberId: id,
        memberName: displayName,
        groupId: groupid,
        joined,
      });

      addGroupToUser(userAuth.id, groupname, groupid);
    } catch (err) {
      console.log("error creating users", err.message);
    }
  }
  return memberRef;
};

export const fetchMyGroup = async (userAuth) => {
  if (!userAuth) {
    return;
  }
  let myGroup = [];
  if (userAuth.id) {
    const response = firestore
      .collection("group")
      .where("adminId", "==", userAuth.id);
    const data = await response.get();
    data.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      myGroup.push({ id, ...data });
    });
  }

  return myGroup;
};

export const fetchMyMembers = async (userAuth, groupid) => {
  if (!userAuth) {
    return;
  }
  let membersList = [];
  if (userAuth.id) {
    const response = await firestore
      .collection("group")
      .doc(groupid)
      .collection("members");
    const data = await response.get();
    data.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();

      membersList.push({ id, ...data });
    });
  }

  return membersList;
};

export const fetchComments = async (topicId) => {
  let commentList = [];
  const response = firestore
    .collection("topic")
    .doc(topicId)
    .collection("comments");
  const data = await response.get();
  data.docs.forEach((item) => {
    let id = item.id;
    let data = item.data();
    commentList.push({ id, ...data });
  });
  return commentList;
};

 

export const deleteTopicAndGroup = (column, groupId) => {
  firestore
    .collection(column)
    .doc(groupId)
    .delete()
    .then(() => {
      console.log("Group successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
