import GroupActionTypes from "./group-type";
import { firestore } from "../../firebase/firebase";

export const getGroup = () => ({
  type: GroupActionTypes.GET_GROUPS,
});

export const setGroup = (group) => ({
  type: GroupActionTypes.SET_GROUP,
  payload: group,
});

export const setMyGroup = (mygroup) => ({
  type: GroupActionTypes.SET_MYGROUP,
  payload: mygroup,
});

export const getGroupFailure = () => ({
  type: GroupActionTypes.GET_GROUP_FAILURE,
});

export function fetchGroups() {
  return async (dispatch) => {
    dispatch(getGroup());
    try {
      const myGroupList = [];
      const response = firestore.collection("group");
      const data = await response.get();

      data.docs.forEach((item) => {
        let id = item.id;
        let data = item.data();

        myGroupList.push({ id, ...data });
      });

      dispatch(setGroup(myGroupList));
    } catch (error) {
      console.log(error);
      dispatch(getGroupFailure());
    }
  };
}

export function fetchMyGroup(userAuth, myCallback) {
  return async (dispatch) => {
    dispatch(getGroup());
    try {
      let myGroup = [];
      if (userAuth.id) {
        const data = await firestore
          .collection("group")
          .where("adminId", "==", userAuth.id)
          .get();
        data.docs.forEach((item) => {
          let id = item.id;
          let data = item.data();
          myGroup.push({ id, ...data });
        });

        myCallback();

        dispatch(setMyGroup(myGroup));
      }
    } catch (error) {
      console.log(error);
      dispatch(getGroupFailure());
    }
  };
}

// export const fetchGroupCreated = async (userAuth, myCallback) => {
//   let group = [];
//   if (userAuth.id) {
//     const data = await firestore
//       .collection("group")
//       .where("adminId", "==", userAuth.id)
//       .get();
//     data.docs.forEach((item) => {
//       let id = item.id;
//       let data = item.data();
//       group.push({ id, ...data });
//     });

//     myCallback();
//   }

//   return group;
// };
