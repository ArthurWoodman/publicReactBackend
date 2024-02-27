const bodyParser = require('body-parser');
const express = require('express');

const clotheRoutes = require('./routes/clothes');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(authRoutes);
app.use('/clothes', clotheRoutes);
app.use('/orders', orderRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);
