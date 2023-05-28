const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('база монго');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6473635ff467ab2eb7cf469d',
  };
  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.listen(PORT);
