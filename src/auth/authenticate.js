const express = require('express');
const router = express.Router();
const axios = require('axios');

import { firebaseInit } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-SERVICE.js'

// const FIREBASE_API_KEY = process.env.firebaseAPIKey;
const firebaseConfig = {
  apiKey: process.env.firebaseAPIKey,
  // authDomain: "chatbot-6f0d9.firebaseapp.com",
  // projectId: "chatbot-6f0d9",
  // storageBucket: "chatbot-6f0d9.appspot.com",
  // messagingSenderId: "1072161410022",
  // appId: "1:1072161410022:web:8b0f7a4b4f3b4c8d5f8c3d"
};
const app = firebaseInit(firebaseConfig);

router.post('/authenticate', async (req, res) => {

});

router.post('/login', async (req, res) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    // User logged in
    res.status(200).send(userCredential);
  } catch (error) {
    // Error logging in
    res.status(400).send(error);
  }
});

module.exports = {
  router: router,
};





router.post('/signup', async (req, res) => {
  try {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error.response.data);
  }
});

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(400).send(error.response.data);
  }
});
