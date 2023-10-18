const express = require('express');
const router = express.Router();

const dotenv = require('dotenv').config()
const OPENAI_API_KEY = process.env.openaiAPIKey;

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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

  try {

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: history,
    }
    );

    const openaiMessage = openaiResponse.choices[0].message.content;
    res.json({ response: openaiMessage });
  } catch (error) {
    res.status(500).json({ error: `Failed, response from OpenAI: ${error.message}` });
  }
});

module.exports = {
  router: router,
};
