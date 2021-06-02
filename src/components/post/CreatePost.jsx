import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost, firestore } from "../../firebase/firebase";

function CreatePost({ currentUser, groups }) {
  const [topic, setTopic] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  let id = currentUser ? currentUser.id : "";
  const fetchPosts = async () => {
    let myPosts = [];
    let db = firestore
      .collection("posts")
      .where("adminId", "==", currentUser.id);
    let postsRef = await db.get();

    postsRef.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      console.log(item.data());
      myPosts.push({ id, ...data });
    });

    setPosts(myPosts);
  };

  React.useEffect(() => {
    if (id) {
      fetchPosts();
    }
  }, [id]);

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
  console.log("POST");
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
      <h1>MY POSTSS</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            {post.title}
            <button type="submit" className="btn btn-primary">
              Add comment
            </button>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
  };
};

export default connect(mapStateToProps)(CreatePost);
