const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const FIREBASE_API_KEY = process.env.firebaseAPIKey;
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "aegwynn-c7092.firebaseapp.com",
  databaseURL: "https://aegwynn-c7092-default-rtdb.firebaseio.com",
  projectId: "aegwynn-c7092",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const db = getFirestore(app);


router.post('/signup', async (req, res) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    res.status(200).send(userCredential);

  } catch (error) {

    console.error("Login Error:", error);
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    console.log('\n\n FIREBASE_API_KEY: ', FIREBASE_API_KEY, '\n\n');
    const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    console.log(userCredential);
    const response = await formatResponse(userCredential);
    res.status(200).send(response);

  } catch (error) {

    console.error(error);
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
      expiresIn: "60000",
      localId: userCredential.user.uid,
      registered: true
    };
  } catch (error) {
    console.error("Error formatting response:", error);
    throw error;
  }
}


module.exports = {
  router: router
};
