import TopicActionTypes from "./topic-type";
const INITIAL_STATE = {
  loading: false,
  hasErrors: false,
  groupTopic: [],
};

const topicReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TopicActionTypes.GET_TOPICS:
      return { ...state, loading: true };

    case TopicActionTypes.SET_GROUP_TOPIC:
      return { groupTopic: action.payload, loading: false, hasErrors: false };

    case TopicActionTypes.GET_TOPIC_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
};

export default topicReducer;
