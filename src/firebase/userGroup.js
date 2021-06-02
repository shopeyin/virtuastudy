import { firestore } from "./firebase";

export const fetchMyGroup = async (id) => {
  let myGroupList = [];
  const response = firestore.collection("users").doc(id).collection("mygroup");
  const data = await response.get();
  data.docs.forEach((item) => {
    let id = item.id;
    let data = item.data();
    myGroupList.push({ id, ...data });
  });
  return myGroupList;
};


export const leaveTheGroup = (userId, mygroupId, groupyId) => {
    firestore
      .collection("users")
      .doc(userId)
      .collection("mygroup")
      .doc(mygroupId)
      .delete()
      .then(() => {
        console.log("UserMygroup successfully deleted!");
    
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });

    firestore
      .collection("groupy")
      .doc(groupyId)
      .collection("members")
      .doc(userId)
      .delete()
      .then(() => {
        console.log("GroupyMembers successfully deleted!");
        
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

