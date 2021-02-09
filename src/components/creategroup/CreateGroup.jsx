import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  createGroup,
  firestore,
  fetchMyGroup,
  fetchMyMembers,
} from "../../firebase/firebase";
import CreatePost from "../post/CreatePost";
import { Link } from "react-router-dom";

import { fetchGroups } from "../../redux/group/group-action";

function CreateGroup({ currentUser, groups }) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState([]);
  const [members, setMembers] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setName({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGroup(currentUser, name.name).then((res) => {
      setSubmited(true);
    });
    e.target.reset();
  };

  let id = currentUser ? currentUser.id : "";

  const fetchMembers = async () => {
    if (!isEmpty) {
      let myMembers = await fetchMyMembers(currentUser, group[0].id);
      console.log(myMembers);
      setMembers(myMembers);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        let myGroup = await fetchMyGroup(currentUser);
        setGroup(myGroup);
        setIsEmpty(false);
      }
    };
    fetchData();
    fetchMembers();
  }, [id, submited, isEmpty]);

  console.log("members ooo", members);
  console.log("groooo", group);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputTitle">Group Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="TitleHelp"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add group{" "}
        </button>
      </form>
      <div>
        <h3>Group Name</h3>
        <div>
          {group.map((item) => {
            return <div key={item.id}>{item.groupName}</div>;
          })}
        </div>
        <div>
          <Link to="/addpost" className="btn btn-secondary">
            Add post{" "}
          </Link>
        </div>{" "}
      </div>

      <div>
        <h3>List of members</h3>
        {members.map((member) => {
          return (
            <div key={member.id}>
              {member.id} ------------ {member.memberName}
            </div>
          );
        })}
      </div>

      {/* <CreatePost /> */}
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   setGroup: (group) => dispatch(setGroup(group)),
// });

const mapStateToProps = (state) => {
  console.log(state, "state is here");
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,

    hasErrors: state.group.hasErrors,
  };
};

export default connect(mapStateToProps)(CreateGroup);
