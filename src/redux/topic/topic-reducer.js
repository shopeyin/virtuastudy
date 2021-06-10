import TopicActionTypes from "./topic-type";
const INITIAL_STATE = {
  topics: [],
  loading: false,
  hasErrors: false,
};

const topicReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TopicActionTypes.GET_TOPICS:
      return { ...state, loading: true };
    case TopicActionTypes.SET_TOPIC:
   
      return { topics: action.payload, loading: false, hasErrors: false };

    case TopicActionTypes.GET_TOPIC_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
};

export default topicReducer;
