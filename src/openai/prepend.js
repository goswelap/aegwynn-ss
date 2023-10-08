const data = require('./data');

function constructConversation(conversation) {
  const chatlog = [];
  const userMessages = conversation.user;
  const assistantMessages = conversation.assistant;

  const instructions = data.getInstructions();
  const agendaData = data.getAgendaData();

  chatlog.push(...instructions, ...agendaData);

  const maxLength = Math.max(userMessages.length, assistantMessages.length);
  for (let i = 0; i < maxLength; i++) {
    if (userMessages[i]) {
      chatlog.push({ role: 'user', content: userMessages[i] });
    }
    if (assistantMessages[i]) {
      chatlog.push({ role: 'assistant', content: assistantMessages[i] });
    }
  }

  return chatlog;
}

module.exports = {
  constructConversation: constructConversation
};
