import GroupActionTypes from "./group-type";
import { firestore } from "../../firebase/firebase";

export const getGroup = () => ({
  type: GroupActionTypes.GET_GROUPS,
});

export const setGroup = (group) => ({
  type: GroupActionTypes.SET_GROUP,
  payload: group,
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
