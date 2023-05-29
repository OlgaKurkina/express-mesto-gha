const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/router');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6473635ff467ab2eb7cf469d',
  };
  next();
});

app.use(router);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use(helmet());

app.listen(PORT);
