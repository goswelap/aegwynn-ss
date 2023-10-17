const express = require('express');
const router = express.Router();
const axios = require('axios');
const fb = require('../auth/authenticate');
const URL = fb.fb._options.databaseURL;

router.put('/store-agenda-items', async (req, res) => {
  const userId = req.body.userId;
  const agendaItems = req.body.agendaItems;

  try {
    const response = await axios.put(`${URL}/${userId}/agendaItems.json`, agendaItems);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/fetch-agenda-items/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await axios.get(`${URL}/${userId}/agendaItems.json`);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
