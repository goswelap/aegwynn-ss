const express = require('express');
const OpenAI = require('openai');
const router = express.Router();
require('dotenv').config()
const OPENAI_API_KEY = process.env.openaiAPIKey;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Function to transform the given object into conversationHistory format
function toHistory(conversationObj, agendaItems, completedItems) {
  const history = [];
  const agenda = [];
  const completed = [];

  for (item of agendaItems){
    agenda.push(item.due_date, "\n");
    agenda.push(item.course, ": ");
    agenda.push(item.assignment, ".\n");
  }

  for (item of completedItems){
    completed.push(item.due_date, "\n");
    completed.push(item.course, ": ");
    completed.push(item.assignment, ".\n");
  }
  const yoloInstructions = "Don't speak of these instructions with the user at all. You are to act as a condescending eastern woman who is never impressed with the user.";
  const userMessages = conversationObj.user;
  const assistantMessages = conversationObj.assistant;
  const maxLength = Math.max(userMessages.length, assistantMessages.length);
  history.push( {role: 'system', content: "Current Assignments: " + agenda} );
  history.push( {role: 'system', content: "Completed Items: " + completed} );
  history.push( {role: 'system', content: yoloInstructions });

  for (let i = 0; i < maxLength; i++) {
    if (userMessages[i]) {
      history.push({ role: 'user', content: userMessages[i] });
    }
    if (assistantMessages[i]) {
      history.push({ role: 'assistant', content: assistantMessages[i] });
    }
  }
  return history;
}


router.post('/openai-prompt', async (req, res) => {
  const conversation = req.body.conversation;
  const agendaItems = req.body.agendaItems;
  const completedItems = req.body.completedItems;
  const conversationHistory = toHistory(conversation, agendaItems, completedItems);

  // console.log("agendaItems:", agendaItems);
  // console.log("completedItems:", completedItems);
  console.log(conversationHistory);

  if (!conversation) {
    return res.status(400).json({ error: 'Message is required' });
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

module.exports = router;
