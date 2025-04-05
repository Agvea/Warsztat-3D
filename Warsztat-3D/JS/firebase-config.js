  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC6gOxKBrkwKKoi3B-ihOayNSDYhebhZ74",
    authDomain: "warsztat-3d.firebaseapp.com",
    projectId: "warsztat-3d",
    storageBucket: "warsztat-3d.firebasestorage.app",
    messagingSenderId: "405984174379",
    appId: "1:405984174379:web:e74aa5aa5297ebfa20256e",
    measurementId: "G-2X1Z66HYJJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export { db };
