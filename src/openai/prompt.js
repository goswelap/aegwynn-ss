const express = require('express');
const router = express.Router();

const OpenAI = require('openai');
const OPENAI_API_KEY = process.env.openaiAPIKey;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const prepend = require('./prepend');

router.post('/openai-prompt', async (req, res) => {
  console.log(new Date().toISOString());
  console.log("\n\n\n\n\n\n");

  const conversation = req.body.conversation;
  const conversationHistory = prepend.constructConversation(conversation);
  console.log(new Date().toISOString());
  console.log("Conversation history:", conversationHistory);

  if (!conversation) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!conversationHistory) {
    return res.status(400).json({ error: 'Conversation history is required' });
  }

  try {
    const openaiResponse = await openai.chat.completions.create({
      messages: conversationHistory,
      model: 'gpt-3.5-turbo',
    });

    const openaiMessage = openaiResponse.choices[0].message.content;
    res.json({ response: openaiMessage });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: `Failed, response from OpenAI: ${error.message}` });
  }
});

// module.exports = router;
module.exports = {
  router : router,
};
