import GroupActionTypes from "./group-type";
const INITIAL_STATE = {
  loading: false,
  hasErrors: false,
  myGroup: [],
};

const myGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GroupActionTypes.GET_GROUPS:
      return { ...state, loading: true };

    case GroupActionTypes.SET_MYGROUP:
      return { myGroup: action.payload, loading: false, hasErrors: false };

    case GroupActionTypes.GET_GROUP_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
};

export default myGroupReducer;
