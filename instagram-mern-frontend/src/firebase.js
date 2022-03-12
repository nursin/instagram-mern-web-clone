import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBzXu85qNYyOLotZH7dI6F3m3-GTyaRAwg",
  authDomain: "tiktok-mern-web-clone.firebaseapp.com",
  projectId: "tiktok-mern-web-clone",
  storageBucket: "tiktok-mern-web-clone.appspot.com",
  messagingSenderId: "632592121611",
  appId: "1:632592121611:web:4cae4e72b4d9f649caac0e",
  storageBucket: "gs://tiktok-mern-web-clone.appspot.com/",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
