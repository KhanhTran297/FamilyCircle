// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDokpaz7n7nOteLkV7X-4_oVNBHRk20tm4",
  authDomain: "familycircle-e948c.firebaseapp.com",
  projectId: "familycircle-e948c",
  storageBucket: "familycircle-e948c.appspot.com",
  messagingSenderId: "888169418055",
  appId: "1:888169418055:web:ca575771c33af9aead5062",
  measurementId: "G-K1SC03SEJ8",
  databaseURL:
    "https://familycircle-e948c-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const requestPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:
          "BH-nLv3uT1gIDu--kjFf-Gd1u7yaZJlyS4FrrYq9QRSlK5R00Dh9WUH0iVSIKK1gGqgu4gBIUcdD2RmpGy_pgHc",
      }).then((currentToken) => {
        console.log("uid", auth?.currentUser?.uid);
        console.log("FCM Token", currentToken);
        return currentToken;
        // set(ref(database, "users/" + auth?.currentUser?.uid), {
        //   uid: auth?.currentUser?.uid,
        //   token: currentToken,
        // });
      });
    }
  });
};
