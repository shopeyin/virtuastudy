import React, { useEffect } from "react";
import { connect } from "react-redux";

import { JoinGroup } from "../../firebase/adminGroup";
import { Link } from "react-router-dom";
import { fetchGroups } from "../../redux/group/group-action";
import "./userpage.style.scss";
function UserPage({ currentUser, groups, loading, hasErrors, fetchGroups }) {
  useEffect(() => {
    console.log("fetch groups called");
    fetchGroups();
  }, []);

  const renderGroups = () => {
    if (loading) return <p>Loading groups...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;

    if (groups.length === 0) return <p>No group yet</p>;
    return (
      <div className="home">
        {groups.map((item) => {
          return (
            <div key={item.id}>
              {item.groupName}
              <button
                onClick={() => JoinGroup(currentUser, item.id, item.groupName)}
              >
                Join group
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="userpage">
      <div className="container">
        <div className="row">
          <div className="col-md-3">{currentUser.displayName}</div>
          <div className="col-md-3">
            <Link to="/creategroup" className="text-dark">
              CREATE GROUP
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/mygroup" className="text-dark">
              MY GROUP
            </Link>
          </div>
        </div>{" "}
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">List of Groupsss</h3>
          </div>
        </div>{" "}
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center">{renderGroups()}</h3>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchGroups: () => dispatch(fetchGroups()),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    groups: state.group.group,
    loading: state.group.loading,

    hasErrors: state.group.hasErrors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
