const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config()

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');



// const FIREBASE_API_KEY = process.env.firebaseAPIKey;
const firebaseConfig = {
  apiKey: process.env.firebaseAPIKey,
  authDomain: "aegwynn-c7092.firebaseapp.com",
  projectId: "aegwynn-c7092",
  // storageBucket: "chatbot-6f0d9.appspot.com",
  // messagingSenderId: "1072161410022",
  // appId: "1:1072161410022:web:8b0f7a4b4f3b4c8d5f8c3d"
  databaseURL: "https://aegwynn-c7092-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const db = getFirestore(app);


router.post('/signup', async (req, res) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    // User signed up
    res.status(200).send(userCredential);
  } catch (error) {
    // Error signing up
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    // console.log(userCredential);
    const response = await formatResponse(userCredential);

    // User logged in
    res.status(200).send(response);
  } catch (error) {
    // Error logging in
    console.error("Login Error:", error);
    res.status(400).send(error);
  }
});

async function formatResponse(userCredential) {
  try {
    const idToken = await userCredential.user.getIdToken();

    return {
      email: userCredential.user.email,
      idToken: idToken,
      refreshToken: userCredential.user.refreshToken,
      expiresIn: "3600",
      localId: userCredential.user.uid,
      registered: true
    };
  } catch (error) {
    console.error("Error formatting response:", error);
    throw error;
  }
}


module.exports = {
  router: router,
  fb: app,
};
