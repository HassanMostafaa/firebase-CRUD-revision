import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwBv-hMbPVUPXkx2y8TrWmpPRSFNLXxX0",
  authDomain: "crud-rev.firebaseapp.com",
  projectId: "crud-rev",
  storageBucket: "crud-rev.appspot.com",
  messagingSenderId: "787496880715",
  appId: "1:787496880715:web:a4547ac9aba096374b9bce",
  databaseURL: "https://crud-rev-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
