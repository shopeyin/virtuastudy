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
    .collection("users")
    .doc(userAuth.id)
    .collection("group");

  const snapShot = await groupRef.get();

  if (snapShot.empty) {
    const { displayName } = userAuth;
    const createdAt = new Date();

    try {
      await groupRef.add({
        name: name,
        admin: displayName,
        createdAt,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return groupRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
