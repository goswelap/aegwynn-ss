const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('../auth/authenticate').router;
const promptRouter = require('../openai/prompt').router;
const dataRouter = require('../openai/data').router;
const fetchRouter = require('../db/fetch').router;

const allowedOrigins = ['http://eranei.com', 'http://localhost:4200', 'http://localhost:3000', 'http://127.0.0.1:4200', 'http://127.0.0.1:3000'];

app.use(bodyParser.json()); // Middleware to parse JSON requests

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/', promptRouter);
app.use('/', dataRouter);
app.use('/', authRouter);
app.use('/', fetchRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
