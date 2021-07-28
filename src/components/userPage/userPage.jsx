import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { JoinGroup } from "../../firebase/adminGroup";
import { Link, useHistory } from "react-router-dom";
import { fetchGroups } from "../../redux/group/group-action";
import "./userpage.style.scss";

function UserPage({ currentUser, groups, loading, hasErrors, fetchGroups }) {
  useEffect(() => {
    console.log("fetch groups called userpage");
    fetchGroups();
  }, []);

  const history = useHistory();

  const routeChange = (groupId) => {
    history.push(`group/${groupId}`);
  };

  const joinTheGroup = async (currentUser, itemid, itemgroupName) => {
    await JoinGroup(currentUser, itemid, itemgroupName);
  };

  const renderGroups = () => {
    if (loading) return <p>Loading groups...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;

    if (groups.length === 0) return <p>No group yet</p>;
    return (
      <>
        {" "}
        {groups.map((item) => {
          return (
            <div className="row m-2" key={item.id}>
              <div className="col-12 col-sm-7 col-md-7 col-lg-6 ">
                <div
                  className="card rounded"
                  key={item.id}
                  style={{ width: "100%", minHeight: "6rem" }}
                >
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{item.groupName}</h5>

                    <button
                      onClick={() => {
                        joinTheGroup(currentUser, item.id, item.groupName);
                        routeChange(item.id);
                      }}
                    >
                      Join group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
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
        {renderGroups()}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserPage)
);
