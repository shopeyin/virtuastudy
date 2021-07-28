import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import groupReducer from "./group/group-reducer";
import topicReducer from "./topic/topic-reducer";
import commentReducer from "./comment/comment-reducer";
import delStatusReducer from "./delStatus/delStatus-reducer";
import myGroupReducer from "./group/mygroup-reducer";
const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  topic: topicReducer,
  comments: commentReducer,
  myGroup: myGroupReducer,
  del_Status: delStatusReducer,
});
export default rootReducer;
