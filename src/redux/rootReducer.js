import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import groupReducer from "./group/group-reducer";
import topicReducer from "./topic/topic-reducer";
import commentReducer from "./comment/comment-reducer";
import delStatusReducer from "./delStatus/delStatus-reducer";
const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  topic: topicReducer,
  comments: commentReducer,
  del_Status: delStatusReducer,
});
export default rootReducer;
