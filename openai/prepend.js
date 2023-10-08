const data = require('./data');

function constructConversation(conversation) {
  const chatlog = [];
  const userMessages = conversation.user;
  const assistantMessages = conversation.assistant;

  const instructions = data.getInstructions();
  const agendaData = data.getAgendaData();
  console.log(new Date().toISOString());
  console.log("Instructions:", instructions);
  console.log("Agenda data:", agendaData);
  chatlog.push(...instructions, ...agendaData);
  console.log("\n\n\n\n\n\n");

  const maxLength = Math.max(userMessages.length, assistantMessages.length);
  for (let i = 0; i < maxLength; i++) {
    if (userMessages[i]) {
      chatlog.push({ role: 'user', content: userMessages[i] });
    }
    if (assistantMessages[i]) {
      chatlog.push({ role: 'assistant', content: assistantMessages[i] });
    }
  }
  console.log(new Date().toISOString());
  console.log("Chatlog:", chatlog);
  console.log("\n\n\n\n\n\n");
  return chatlog;
}

module.exports = {
  constructConversation: constructConversation
};
