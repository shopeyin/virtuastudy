import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAOmjmbdJhi6X_iKauQjxWcFgIwakf13Uw",
  authDomain: "virtuastudy-42b4e.firebaseapp.com",
  projectId: "virtuastudy-42b4e",
  storageBucket: "virtuastudy-42b4e.appspot.com",
  messagingSenderId: "440226680769",
  appId: "1:440226680769:web:654a179a67ca7354c1e940",
  measurementId: "G-TG093HZW3B",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating users", err.message);
    }
  }

  return userRef;
};

export const createGroup = async (userAuth, name) => {
  if (!userAuth) {
    return;
  }

  let groupRef = await firestore
    .collection("groupy")
    .add({
      groupName: name,
      adminName: userAuth.displayName,
      adminId: userAuth.id,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  return groupRef;
};

export const createPost = async (userAuth, title) => {
  if (!userAuth) {
    return;
  }
  const createdAt = new Date();

  let postRef = await firestore
    .collection("posts")
    .add({
      title: title.topic,
      adminName: userAuth.displayName,
      adminId: userAuth.id,
      datePosted: createdAt,
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  return postRef;
};

export const fetchMyGroup = async (userAuth) => {
  if (!userAuth) {
    return;
  }
  let myGroup = [];
  if (userAuth.id) {
    const response = firebase
      .firestore()
      .collection("groupy")
      .where("adminId", "==", userAuth.id);
    const data = await response.get();
    data.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      myGroup.push({ id, ...data });
      console.log(myGroup);
    });
  }

  return myGroup;
};

export const fetchMyMembers = async (userAuth, group) => {
  if (!userAuth) {
    return;
  }
  let membersList = [];
  if (userAuth.id) {
    const response = await firebase
      .firestore()
      .collection("groupy")
      .doc(group)
      .collection("members");
    const data = await response.get();
    console.log(data);
    data.docs.forEach((item) => {
      let id = item.id;
      let data = item.data();
      console.log(item.data());
      membersList.push({ id, ...data });
    });
  }

  return membersList;
};

export const addGroupToUserTable = async (userAuthId, name) => {
  if (!userAuthId) {
    return;
  }

  if (userAuthId) {
    const memberRef = firebase
      .firestore()
      .collection("users")
      .doc(userAuthId)
      .collection("mygroup")
      .doc();
    const snapShot = await memberRef.get();

    if (!snapShot.exists) {
      const joined = new Date();

      try {
        await memberRef.set({
          groupName: name,
          joined,
        });
        console.log("added to user members list");
      } catch (err) {
        console.log("error creating users", err.message);
      }
    }
  }

  return userAuthId;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
