import React, { Component } from "react";
import { connect } from "react-redux";
import { createTopic, firestore } from "../../firebase/firebase";
import { fetchTopics } from "../../redux/topic/topic-action";

function CreateTopic({
  currentUser,
  topics,
  fetchTopics,
  groupLoaded,
  myGroup,

  deleteTopic,
}) {
  const [topic, setTopic] = React.useState("");

  const [submitted, setSubmitted] = React.useState(false);

  let id = currentUser ? currentUser.id : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    createTopic(currentUser, topic);
    setSubmitted(!submitted);
    fetchTopics(currentUser);
    e.target.reset();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setTopic({
      [name]: value,
    });
  };

  React.useEffect(() => {
    console.log(topics);
  }, [id, submitted, topics]);

  console.log("HERE OOO", groupLoaded, myGroup);
  let dataToRender;
  if (groupLoaded && myGroup.length && topics.length === 0) {
    dataToRender = (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputTitle"> Post Topic</label>
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
    );
  } else if (groupLoaded && myGroup.length && topics.length) {
    dataToRender = (
      <div>
        {" "}
        <h3>MY TOPIC</h3>
        {/* {topics.length ? (
          <div key={topics[0].id}>
            {topics[0].title}--{topics[0].id}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => deleteTopic("topics", topics[0].id)}
            >
              Delete topic
            </button>
          </div>
        ) : (
          ""
        )} */}
        {topics.map((topic) => {
          return (
            <div key={topic.id}>
              {topic.title}--{topic.id}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => deleteTopic("topic", topic.id)}
              >
                Delete topic
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  return <div>{dataToRender}</div>;
}

const mapDispatchToProps = (dispatch) => ({
  fetchTopics: (currentUser) => dispatch(fetchTopics(currentUser)),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    topics: state.topic.topics,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);
