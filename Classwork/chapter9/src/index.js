import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'bootstrap/dist/css/bootstrap.min.css';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCSC1VQt-IGuGE-CBk03rl8i3yfdrKsYZo",
    authDomain: "chapter-9-40bce.firebaseapp.com",
    projectId: "chapter-9-40bce",
    storageBucket: "chapter-9-40bce.appspot.com",
    messagingSenderId: "811685190538",
    appId: "1:811685190538:web:e856e80281428416cc4673",
    measurementId: "G-0P1Z5KVSZF",
    databaseURL: "https://chapter-9-40bce-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
