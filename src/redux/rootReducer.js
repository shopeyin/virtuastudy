import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import groupReducer from "./group/group-reducer";
import topicReducer from "./topic/topic-reducer";



const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  topic: topicReducer,
});
export default rootReducer;
