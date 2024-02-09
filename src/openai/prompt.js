const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Make sure this is set in your .env file

const prepend = require('./prepend');

router.post('/openai-prompt', async (req, res) => {
  const conversation = req.body.conversation;
  const history = prepend.constructConversation(conversation);
  const timestamp = new Date().toISOString();
  history.unshift({ role: 'system', content: `Current Date and Time: ${timestamp}` });

  if (!conversation) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!history) {
    return res.status(400).json({ error: 'Conversation history is required' });
  }

  const data = {
    model: "gpt-3.5-turbo",
    messages: history,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    const openaiMessage = response.data.choices[0].message.content;
    res.json({ response: openaiMessage });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: `Failed, response from OpenAI: ${error.message}` });
  }
});

module.exports = {
  router: router,
};
