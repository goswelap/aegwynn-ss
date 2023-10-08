const express = require('express');
const router = express.Router();

const rin = require('./instructions/rin');

let agendaItems = [];
let completedItems = [];

let agenda = [];
let completed = [];

router.post('/agenda-item-handler', async (req, res) => {
  if (req.body.agendaItems) {
    agendaItems = req.body.agendaItems;

    agenda = [];
    for (item of agendaItems) {
      agenda.push(item.due_date, "\n");
      agenda.push(item.course, ": ");
      agenda.push(item.assignment, ".\n");
    }
  }

  if (req.body.completedItems) {
    completedItems = req.body.completedItems;

    completed = [];
    for (item of completedItems) {
      completed.push(item.due_date, "\n");
      completed.push(item.course, ": ");
      completed.push(item.assignment, ".\n");
    }
  }

  return res.status(200).json({ response: "success" });
});

function getAgendaData() {
  const history = [];

  history.push({ role: 'system', content: "Current Assignments: " + agenda });
  history.push({ role: 'system', content: "Completed Items: " + completed });

  return history;
}

function getInstructions() {
  return [{ role: 'system', content: rin.instructions }];
}

module.exports = {
  router: router,
  getAgendaData: getAgendaData,
  getInstructions: getInstructions,
};
