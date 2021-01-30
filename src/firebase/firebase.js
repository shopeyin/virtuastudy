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

export const fetchGroup = async (userAuth) => {
  if (!userAuth) {
    return;
  }

  //   if (userAuth.id) {
  //     console.log(clicked);
  //     firestore
  //       .collection("users")
  //       .doc(userAuth.id)
  //       .collection("group")
  //       .get()
  //       .then(function (snapshot) {
  //         snapshot.forEach(function (doc) {
  //           console.log(doc.data());
  //           return
  //         });
  //       });
  //   }

  //   return doc;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
