import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addComment } from "../../firebase/firebase";
import { delStatus } from "../../redux/delStatus/delStatus-action";
import { fetchComments } from "../../redux/comment/comment-action";
function PostComment({ topics, currentUser, delStatus, groupTopic }) {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    const { value, name } = event.target;

    setComment({
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addComment(groupTopic[0].id, comment.comment, currentUser);
    console.log("post submit called");
    delStatus();
    event.target.reset();
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const style = {
    marginLeft: "2rem",
  };

  return (
    <div className="row">
      <Button variant="primary" style={style} onClick={handleShow}>
        Add comment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="bod"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} id="blogForm">
            <div className="form-group">
              <label>Content</label>
              <textarea
                name="comment"
                type="text"
                id="form8"
                className="md-textarea form-control"
                rows="4"
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClose}
            >
              Post
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (topicid) => dispatch(fetchComments(topicid)),
  delStatus: () => dispatch(delStatus()),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    topics: state.topic.topics,
    comments: state.comments.comments,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
