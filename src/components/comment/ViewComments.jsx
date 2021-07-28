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
  currentUser,
  groups,
 
  groupTopic,
}) {
  const deleteComment = (commentId) => {
    firestore
      .collection("topic")
      .doc(groupTopic[0].id)
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

  // const fetchDeleteStatus = async () => {
  //   let docRef = await firestore
  //     .collection("topic")
  //     .doc(groupAdminId)
  //     .collection("comments")
  //     .where("userAuthId", "==", currentUser.id)
  //     .get();

  //   if (docRef.empty) {
  //     console.log("NO DATA");
  //   } else {
  //     console.log("AVAI DATA");
  //     console.log(docRef.empty);
  //   }

  // docRef
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("HERE 0000", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document 0000000!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });

  // data.docs.forEach((item) => {
  //   let id = item.id;
  //   let data = item.data();
  //   console.log("DATA HEREEE", data);
  //   // myGroup.push({ id, ...data });
  // });
  //};

  useEffect(() => {
    fetchComments(groupTopic[0].id);
  }, [deleteStatus]);

  console.log(deleteStatus);
  console.log(groupTopic);
  return (
    <div>
      <PostComment groupTopic={groupTopic} />
      all comments
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.comment}--{comment.name}
            {currentUser.id === comment.userAuthId ? (
              <button onClick={() => deleteComment(comment.id)}>
                Delete comment
              </button>
            ) : (
              ""
            )}
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
    groups: state.group.group,
    topics: state.topic.topics,
    comments: state.comments.comments,
    deleteStatus: state.del_Status.del_status,
    groupTopic: state.topic.groupTopic,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewComments);
