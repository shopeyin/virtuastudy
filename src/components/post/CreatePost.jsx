import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost,firestore } from "../../firebase/firebase";
function CreatePost({ currentUser }) {
  const [topic, setTopic] = React.useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(topic);
    createPost(currentUser, topic);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setTopic({
      [name]: value,
    });
  };
  console.log(topic);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputTitle">Add Post</label>
          <input
            type="text"
            className="form-control"
            name="topic"
            aria-describedby="TitleHelp"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post Topic
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(CreatePost);
