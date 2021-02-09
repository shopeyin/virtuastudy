import UserActionTypes from "./user-type";
const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      console.log("CALLED USER");
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SIGN_OUT:
      console.log("SIGN-OUTTT");
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

export default userReducer;
