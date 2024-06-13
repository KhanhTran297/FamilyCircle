// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// const firebaseConfig = {
//   apiKey: "AIzaSyDokpaz7n7nOteLkV7X-4_oVNBHRk20tm4",
//   authDomain: "familycircle-e948c.firebaseapp.com",
//   projectId: "familycircle-e948c",
//   storageBucket: "familycircle-e948c.appspot.com",
//   messagingSenderId: "888169418055",
//   appId: "1:888169418055:web:ca575771c33af9aead5062",
//   measurementId: "G-K1SC03SEJ8",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
<script type="module">

importScripts(
  "https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDokpaz7n7nOteLkV7X-4_oVNBHRk20tm4",
  authDomain: "familycircle-e948c.firebaseapp.com",
  projectId: "familycircle-e948c",
  storageBucket: "familycircle-e948c.appspot.com",
  messagingSenderId: "888169418055",
  appId: "1:888169418055:web:ca575771c33af9aead5062",
  measurementId: "G-K1SC03SEJ8",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
</script>

