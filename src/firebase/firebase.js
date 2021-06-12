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

export const createTopic = async (userAuth, title) => {
  if (!userAuth) {
    return;
  }
  const createdAt = new Date();

  let topicRef = await firestore
    .collection("topic")
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

  return topicRef;
};

export const addGroupToUserTable = async (userAuthId, name, groupId) => {
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
          groupId: groupId,
          joined,
        });
        console.log("added to user members list", groupId);
      } catch (err) {
        console.log("error creating users", err.message);
      }
    }
  }

  return userAuthId;
};

export const addComment = async (topicId, comment, userAuth) => {
  if (!userAuth) {
    return;
  }

  if (userAuth) {
    const commentRef = firebase
      .firestore()
      .collection("topic")
      .doc(topicId)
      .collection("comments")
      .doc();
    const snapShot = await commentRef.get();

    if (!snapShot.exists) {
      const datePosted = new Date();

      try {
        await commentRef.set({
          comment,
          datePosted,
          name: userAuth.displayName,
          userAuthId: userAuth.id,
        });
        console.log("comment added");
      } catch (err) {
        console.log("error posting comment", err.message);
      }
    }
  }

  return userAuth;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
