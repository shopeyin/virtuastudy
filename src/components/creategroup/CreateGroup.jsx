import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createGroup, firestore } from "../../firebase/firebase";

function CreateGroup({ currentUser }) {
  const { id } = currentUser || {};
  console.log(id);
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;

    setName({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createGroup(currentUser, name.name);
  };

  //   useEffect(() => {
  //     let db = firestore
  //       .collection("users")
  //       .doc("js35kAKAXXQDVmtzE83d63qBSru2")
  //       .collection("group")
  //       .doc("lPCV5WhG0uMjyN3Ywmjk")
  //       .onSnapshot(function (doc) {
  //         console.log(doc.data());
  //       });
  //     console.log(db);
  //   }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("HERE OOOOO");
      let db = firestore;
      db.collection("users")
        .doc("js35kAKAXXQDVmtzE83d63qBSru2")
        .collection("group")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        });
      console.log(db);
    }
  }, []);

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
          Add group
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

export default connect(mapStateToProps)(CreateGroup);
