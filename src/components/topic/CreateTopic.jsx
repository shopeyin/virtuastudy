// import React from "react";
// import { connect } from "react-redux";
// import { createTopic, firestore } from "../../firebase/firebase";
// import { fetchTopics } from "../../redux/topic/topic-action";

// function CreateTopic({
//   currentUser,
//   topics,
//   fetchTopics,
//   groupLoaded,
//   myGroup,
//   groupTopic,
//   deleteTopic,
// }) {
//   console.log(groupTopic);

//   const [topic, setTopic] = React.useState("");

//   const [submitted, setSubmitted] = React.useState(false);

//   let id = currentUser ? currentUser.id : "";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createTopic(currentUser, topic);
//     setSubmitted(!submitted);
//     fetchTopics(currentUser);
//     e.target.reset();
//   };

//   const handleChange = (e) => {
//     const { value, name } = e.target;

//     setTopic({
//       [name]: value,
//     });
//   };

//   React.useEffect(() => {}, [id, submitted, topics]);

//   let dataToRender;
//   if (groupLoaded && myGroup.length && topics.length === 0) {
//     dataToRender = (
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="exampleInputTitle"> Post Topic</label>
//           <input
//             type="text"
//             className="form-control"
//             name="topic"
//             aria-describedby="TitleHelp"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Post Topic
//         </button>
//       </form>
//     );
//   } else if (groupLoaded && myGroup.length && topics.length) {
//     dataToRender = (
//       <div>
//         {" "}
//         <h3>MY TOPIC</h3>
//         {topics.map((topic) => {
//           return (
//             <div key={topic.id}>
//               {topic.title}--{topic.id}
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 onClick={() => deleteTopic("topic", topic.id)}
//               >
//                 Delete topic
//               </button>
//               {/* <PostComment /> */}
//               {/* <ViewComment /> */}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
//   return <div>{dataToRender}</div>;
// }

// const mapDispatchToProps = (dispatch) => ({
//   fetchTopics: (currentUser) => dispatch(fetchTopics(currentUser)),
// });

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.user.currentUser,
//     groups: state.group.group,
//     topics: state.topic.topics,
//     groupTopic: state.topic.groupTopic,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);

// import React from "react";
// import { connect } from "react-redux";
// import { createTopic } from "../../firebase/firebase";
// import { fetchGroupTopic } from "../../redux/topic/topic-action";

// function CreateTopic({
//   currentUser,
//   myGroup,
//   groupTopic,
//   deleteTopic,
//   fetchGroupTopic,
//   topicLoaded,
//   groupLoaded,
//   groupAdded,
// }) {
//   const [topic, setTopic] = React.useState("");

//   const [submitted, setSubmitted] = React.useState(false);

//   let id = currentUser ? currentUser.id : "";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createTopic(currentUser, topic);
//     setSubmitted(!submitted);
//     fetchGroupTopic(myGroup[0].adminId);
//     e.target.reset();
//   };

//   const handleChange = (e) => {
//     const { value, name } = e.target;

//     setTopic({
//       [name]: value,
//     });
//   };

//   React.useEffect(() => {
//     console.log("child called");
//   }, [id, submitted, groupAdded]);

//   let dataToRender;
//   if (topicLoaded && groupTopic.length) {
//     console.log("rendering form");
//     dataToRender = (
//       <div>
//         {" "}
//         <h3>MY TOPIC</h3>
//         {groupTopic.map((topic) => {
//           return (
//             <div key={topic.id}>
//               {topic.title}--{topic.id}
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 onClick={() => deleteTopic("topic", topic.id)}
//               >
//                 Delete topic
//               </button>
//               {/* <PostComment /> */}
//               {/* <ViewComment /> */}
//             </div>
//           );
//         })}
//       </div>
//     );
//   } else if (topicLoaded && groupTopic.length === 0) {
//     console.log("rENDERING topic data");
//     dataToRender = (
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="exampleInputTitle"> Post Topic</label>
//           <input
//             type="text"
//             className="form-control"
//             name="topic"
//             aria-describedby="TitleHelp"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Post Topic
//         </button>
//       </form>
//     );
//   }

//   return <div>{dataToRender}</div>;
// }

// const mapDispatchToProps = (dispatch) => ({
//   fetchGroupTopic: (groupAdminId) => dispatch(fetchGroupTopic(groupAdminId)),
// });

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.user.currentUser,
//     groups: state.group.group,
//     topics: state.topic.topics,
//     groupTopic: state.topic.groupTopic,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);

import React from "react";
import { connect } from "react-redux";
import { createTopic, firestore } from "../../firebase/firebase";
import { deleteTopicOrGroup } from "../../firebase/adminGroup";
import { fetchGroupTopic } from "../../redux/topic/topic-action";
import { delStatus } from "../../redux/delStatus/delStatus-action";

function CreateTopic({
  currentUser,
  myGroup,
  groupTopic,

  fetchGroupTopic,

  groupLoaded,
  del_Status,
  deleteStatus,
}) {
  const [topic, setTopic] = React.useState("");

  const [submitted, setSubmitted] = React.useState(false);

  const [topicLoaded, setTopicLoaded] = React.useState(false);

  let id = currentUser ? currentUser.id : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    createTopic(currentUser, topic);
    setSubmitted(!submitted);

    e.target.reset();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setTopic({
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (myGroup.length) {
      fetchGroupTopic(myGroup[0].adminId).then(() => {
        setTopicLoaded(true);
      });
    }
  }, [id, submitted, myGroup, del_Status]);

  let dataToRender;

  if (groupLoaded && myGroup.length && topicLoaded && groupTopic.length === 0) {
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
  } else if (
    groupLoaded &&
    myGroup.length &&
    topicLoaded &&
    groupTopic.length
  ) {
    dataToRender = (
      <div>
        {" "}
        <h3>MY TOPIC</h3>
        {groupTopic.map((topic) => {
          return (
            <div key={topic.id}>
              {topic.title}--{topic.id}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  deleteTopicOrGroup("topic", topic.id);
                  deleteStatus();
                }}
              >
                Delete topic
              </button>
            </div>
          );
        })}
      </div>
    );
  }
  console.log(del_Status);
  return <div>{dataToRender}</div>;
}

const mapDispatchToProps = (dispatch) => ({
  fetchGroupTopic: (groupAdminId, myCallBack) =>
    dispatch(fetchGroupTopic(groupAdminId, myCallBack)),
  deleteStatus: () => dispatch(delStatus()),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    myGroup: state.myGroup.myGroup,
    groupTopic: state.topic.groupTopic,
    del_Status: state.del_Status.del_status,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic);
