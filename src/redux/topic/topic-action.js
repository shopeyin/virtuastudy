import TopicActionTypes from "./topic-type";
import { firestore } from "../../firebase/firebase";

export const getTopic = () => ({
  type: TopicActionTypes.GET_TOPICS,
});

export const setTopic = (topic) => ({
  type: TopicActionTypes.SET_TOPIC,
  payload: topic,
});

export const getTopicFailure = () => ({
  type: TopicActionTypes.GET_TOPIC_FAILURE,
});

export function fetchTopics(userAuth) {
  return async (dispatch) => {
    dispatch(getTopic());
    try {
      const myTopicList = [];
      const response = firestore
        .collection("topic")
        .where("adminId", "==", userAuth.id);
      const data = await response.get();
      console.log("TOPIC called", data);
      data.docs.forEach((item) => {
        let id = item.id;
        let data = item.data();

        myTopicList.push({ id, ...data });
      });

      dispatch(setTopic(myTopicList));
    } catch (error) {
      console.log(error);
      dispatch(getTopicFailure());
    }
  };
}
