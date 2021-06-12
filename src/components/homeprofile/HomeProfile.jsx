import React, { lazy, Suspense } from "react";

import { Switch, Route, Link } from "react-router-dom";
import { fetchGroups } from "../../redux/group/group-action";
// import CreateGroup from "../creategroup/CreateGroup";
import MyGroup from "../mygroup/MyGroup";

// import UserPage from "../userPage/userPage";
import Navigation from "../navbar/Navbar";

const UserPage = lazy(() => import("../userPage/userPage"));
const CreateGroup = lazy(() => import("../creategroup/CreateGroup"));
const GroupPage = lazy(() => import("../creategroup/GroupPage"));

function HomeProfile() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Suspense
          fallback={
            <div className="d-flex justify-content-center">..Loading</div>
          }
        >
          <Route exact path="/" component={UserPage} />
          <Route path="/creategroup" component={CreateGroup} />
          <Route path="/mygroup" component={MyGroup} />
          <Route path="/group" component={GroupPage} />
        </Suspense>
      </Switch>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   fetchGroups: () => dispatch(fetchGroups()),
// });

export default HomeProfile;
