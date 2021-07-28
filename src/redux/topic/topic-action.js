import TopicActionTypes from "./topic-type";
import { firestore } from "../../firebase/firebase";

export const getTopic = () => ({
  type: TopicActionTypes.GET_TOPICS,
});

export const getTopicFailure = () => ({
  type: TopicActionTypes.GET_TOPIC_FAILURE,
});

export const setGroupTopic = (topic) => ({
  type: TopicActionTypes.SET_GROUP_TOPIC,
  payload: topic,
});

// export function fetchGroupTopic(groupAdminId, myCallBack) {
//   console.log(groupAdminId);
//   console.log("called");
//   return async (dispatch) => {
//     dispatch(getTopic());
//     try {
//       const myTopic = [];
//       if (groupAdminId) {
//         const response = firestore
//           .collection("topic")
//           .where("adminId", "==", groupAdminId);
//         const data = await response.get();
//         data.docs.forEach((item) => {
//           let id = item.id;
//           let data = item.data();

//           myTopic.push({ id, ...data });
//         });
//         myCallBack();
//         dispatch(setGroupTopic(myTopic));
//       }
//     } catch (error) {
//       console.log(error);

//       dispatch(getTopicFailure());
//     }
//   };
// }

export function fetchGroupTopic(groupAdminId) {
  return async (dispatch) => {
    dispatch(getTopic());
    try {
      const myTopic = [];
      if (groupAdminId) {
        const response = firestore
          .collection("topic")
          .where("adminId", "==", groupAdminId);
        const data = await response.get();
        data.docs.forEach((item) => {
          let id = item.id;
          let data = item.data();

          myTopic.push({ id, ...data });
        });

        dispatch(setGroupTopic(myTopic));
      }
    } catch (error) {
      console.log(error);

      dispatch(getTopicFailure());
    }
  };
}
