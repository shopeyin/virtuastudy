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
    measurementId: "G-TG093HZW3B"
};
firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);



export default firebase;