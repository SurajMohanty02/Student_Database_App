import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAs-917oreIA7cK25I6sapWxciqT3Sf8nE",
  authDomain: "studentdata-ea1dc.firebaseapp.com",
  projectId: "studentdata-ea1dc",
  storageBucket: "studentdata-ea1dc.appspot.com",
  messagingSenderId: "556899582403",
  appId: "1:556899582403:web:745daea295c05e42c37d76",
  measurementId: "G-TEFLT70FLV",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
export { auth, storage };
export default db;
