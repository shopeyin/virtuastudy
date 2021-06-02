import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMyGroup, leaveTheGroup } from "../../firebase/userGroup";

function MyGroup({ currentUser, groups }) {
  const [myGroup, setMyGroup] = useState([]);
  const [leaveGroupStatus, setLeaveGroupStatus] = useState(false);

  let id = currentUser ? currentUser.id : "";

  const fetchUserGroup = async () => {
    let userGroup = await fetchMyGroup(id);
    setMyGroup(userGroup);
  };

  useEffect(() => {
    if (id) {
      fetchUserGroup();
    }
  }, [id, leaveGroupStatus]);

  const leaveGroup = (userId, mygroupId, groupyId) => {
    leaveTheGroup(userId, mygroupId, groupyId);
    setLeaveGroupStatus(true);
  };

  const searchItem = (groups, obj) => {
    if (groups.find((item) => item.id === obj.groupId)) {
      return true;
    }
    return false;
  };
  
  return (
    <div>
      My Group
      <div>{leaveGroupStatus ? "Successfully left the group " : ""}</div>
      {myGroup.map((item) => {
        if (searchItem(groups, item)) {
          return (
            <div key={item.id}>
              {item.id}--- {item.groupName} {item.groupId}{" "}
              <Link to="/viewpost" className="btn btn-secondary">
                View post{" "}
              </Link>{" "}
              <button onClick={() => leaveGroup(id, item.id, item.groupId)}>
                Leave group
              </button>
            </div>
          );
        }
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("MYGROUP", state);
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,
    hasErrors: state.group.hasErrors,
  };
};

export default connect(mapStateToProps)(MyGroup);
