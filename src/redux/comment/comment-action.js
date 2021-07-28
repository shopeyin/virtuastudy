import CommentActionTypes from "./comment-type";
import { firestore } from "../../firebase/firebase";
export const getComments = () => ({
  type: CommentActionTypes.GET_COMMENTS,
});

export const setComment = (comment) => ({
  type: CommentActionTypes.SET_COMMENTS,
  payload: comment,
});

export const getCommentsFailure = () => ({
  type: CommentActionTypes.GET_COMMENTS_FAILURE,
});

export function fetchComments(groupTopicId) {
  return async (dispatch) => {
    dispatch(getComments());
    try {
      let commentList = [];
      const response = firestore
        .collection("topic")
        .doc(groupTopicId)
        .collection("comments");
      const data = await response.get();
      data.docs.forEach((item) => {
        let id = item.id;
        let data = item.data();
        commentList.push({ id, ...data });
      });
      dispatch(setComment(commentList));
    } catch (error) {
      console.log(error);
      dispatch(getCommentsFailure());
    }
  };
}
