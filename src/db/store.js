const express = require('express');
const router = express.Router();

const auth = require('../auth/authenticate');

router.post('/store-agenda-items', async (req, res) => {
});
router.post('/store-completed-items', async (req, res) => {
});
router.post('/store-courses', async (req, res) => {
});

module.exports = {
  router: router,
};
