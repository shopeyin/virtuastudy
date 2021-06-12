import CommentActionTypes from "./comment-type";
const INITIAL_STATE = {
  comments: [],
  loading: false,
  hasErrors: false,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.GET_COMMENTS:
      return { ...state, loading: true };

    case CommentActionTypes.SET_COMMENTS:
      return { comments: action.payload, loading: false, hasErrors: false };

    case CommentActionTypes.GET_COMMENTS_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    default:
      return state;
  }
};

export default commentReducer;
