import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createGroup, firestore } from "../../firebase/firebase";
import CreatePost from "../post/CreatePost";

function CreateGroup({ currentUser }) {
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
  };

  //   function isEmpty(obj) {
  //     return Object.keys(obj).length === 0;
  //   }

  //   useEffect(() => {
  //     // let db = await firestore
  //     //   .collection("users")
  //     //   .doc(currentUser.id)
  //     //   .collection("group")
  //     //   .doc("lPCV5WhG0uMjyN3Ywmjk")
  //     //   .onSnapshot(function (doc) {
  //     //     console.log(doc.data());
  //     //   });
  //     // console.log(db);
  //   }, []);
  let id = currentUser ? currentUser.id : "";

  const fetchMembers = async () => {
    if (group) {
      let membersList = [];
      await firestore
        .collection("groupy")
        .doc(group.id)
        .collection("members")
        .get()
        .then((snapshot) => {
          snapshot.forEach(function (doc) {
            let id = doc.id;
            let data = doc.data();
            membersList.push({ id: id, data: data });
          });

          setMembers(membersList);
        });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        firestore
          .collection("groupy")
          .where("adminId", "==", id)

          .get()
          .then(function (snapshot) {
            snapshot.forEach(function (doc) {
              setGroup({
                id: doc.id,
                ...doc.data(),
              });
            });
            setIsEmpty(false);
          });
        await fetchMembers();
      }
    };
    fetchData();
  }, [id, submited, isEmpty]);

  // db.collection("cities").get().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //     });
  // });

  console.log("members ooo", members);
  console.log("group", group);
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
        <div key={group.id}>{group.groupName}</div>
      </div>

      <div>
        <h3>List of members</h3>
        {members.map((member) => {
          return (
            <div key={member.id}>
              {member.id} ------------ {member.data.memberName}
            </div>
          );
        })}
      </div>
      <CreatePost />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(CreateGroup);
