// This snippet file was generated by processing the source file:
// ./messaging-next/service-worker.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START messaging_init_in_sw_modular]
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDokpaz7n7nOteLkV7X-4_oVNBHRk20tm4",
  authDomain: "familycircle-e948c.firebaseapp.com",
  projectId: "familycircle-e948c",
  storageBucket: "familycircle-e948c.appspot.com",
  messagingSenderId: "888169418055",
  appId: "1:888169418055:web:ca575771c33af9aead5062",
  measurementId: "G-K1SC03SEJ8",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
// [END messaging_init_in_sw_modular]
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
