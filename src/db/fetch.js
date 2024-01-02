const express = require('express');
const router = express.Router();
const axios = require('axios');
// const URL = fb.fb._options.databaseURL;
const URL = "https://aegwynn-c7092-default-rtdb.firebaseio.com";

router.post('/store-courses/:userId', async (req, res) => {
  const courses = req.body;
  const userId = req.params.userId;
  try {
    const response = await axios.put(`${URL}/${userId}/courses.json`, courses);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/store-agenda-items/:userId', async (req, res) => {
  const agendaItems = req.body;
  const userId = req.params.userId;
  try {
    const response = await axios.put(`${URL}/${userId}/agendaItems.json`, agendaItems);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/store-completed-items/:userId', async (req, res) => {
  const completedItems = req.body;
  const userId = req.params.userId;
  try {
    const response = await axios.put(`${URL}/${userId}/completedItems.json`, completedItems);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/fetch-courses/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`${URL}/${userId}/courses.json`);
    res.send(response.data ? response.data : []);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/fetch-agenda-items/:userId', async (req, res) => {
  console.log("fetching agenda items");
  const userId = req.params.userId;
  try {
    console.log("fetching from ", `${URL}/${userId}/agendaItems.json`);
    const response = await axios.get(`${URL}/${userId}/agendaItems.json`);
    console.log("got response", response.data);
    if (response.data && Array.isArray(response.data)) {
      console.log("sending agenda items");
      res.send(response.data.map(agendaItem => ({ ...agendaItem })));
    } else {
      res.send([]);
    }
  } catch (error) {
    console.log("couldn't fetch from ", `${URL}/${userId}/agendaItems.json`);
    res.status(500).send(error.message);
  }
});

router.get('/fetch-completed-items/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`${URL}/${userId}/completedItems.json`);
    if (response.data && Array.isArray(response.data)) {
      res.send(response.data.map(completedItem => ({ ...completedItem })));
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = {
  router: router,
  // fb: fb,
  url: URL,
};
