import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyDA2lcGl9uV1pJ3WHTrTvw-J_H5tldlHoo",
    authDomain: "summative-32a79.firebaseapp.com",
    projectId: "summative-32a79",
    storageBucket: "summative-32a79.firebasestorage.app",
    messagingSenderId: "770652347729",
    appId: "1:770652347729:web:5644a4a23d87f1f9c6c770"
};

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };