const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const promptRouter = require('./prompt');

const allowedOrigins = ['http://eranei.com', 'http://localhost:4200'];

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

