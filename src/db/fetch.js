const express = require('express');
const router = express.Router();

const Http = new XMLHttpRequest();

const fb = require('../auth/authenticate');
const URL = fb.fb._options.databaseURL;

router.post('/fetch-agenda-items', async (req, res) => {
  Http.open("GET", URL + "/agenda-items.json");
  Http.send();

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
});
router.post('/fetch-completed-items', async (req, res) => {
});
router.post('/fetch-courses', async (req, res) => {
});


module.exports = {
  router: router,
  fb: fb,
  url: URL,
};
