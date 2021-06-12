import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { connect } from "react-redux";
// import { fetchComments } from "../../firebase/adminGroup";
import { fetchComments } from "../../redux/comment/comment-action";
import { delStatus } from "../../redux/delStatus/delStatus-action";
import PostComment from "../comment/PostComment";

function ViewComments({
  topics,
  fetchComments,
  comments,
  deleteStatus,
  delStatus,
}) {
  const deleteComment = (commentId) => {
    firestore
      .collection("topic")
      .doc(topics[0].id)
      .collection("comments")
      .doc(commentId)
      .delete()
      .then(() => {
        console.log("Comment successfully deleted!");
        // setDeleteStatus(!deleteStatus);
        delStatus();
      })
      .catch((error) => {
        console.error("Error deleting comment: ", error);
      });
  };

  useEffect(() => {
    fetchComments(topics[0].id);
    console.log("CALLLLER CALLED");
  }, [deleteStatus]);
  console.log(deleteStatus);
  return (
    <div>
      <PostComment />
      all comments
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.comment}--{comment.id}
            <button onClick={() => deleteComment(comment.id)}>
              Delete comment
            </button>
          </div>
        );
      })}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (topicid) => dispatch(fetchComments(topicid)),
  delStatus: () => dispatch(delStatus()),
});

const mapStateToProps = (state) => {
  console.log("STATE IS HERE", state);
  return {
    currentUser: state.user.currentUser,
    topics: state.topic.topics,
    comments: state.comments.comments,
    deleteStatus: state.del_Status.del_status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewComments);
