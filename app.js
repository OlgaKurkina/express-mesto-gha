const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const router = require('./routes/router');
const auth = require('./middlewares/auth');

const errorCheck = require('./middlewares/errorCheck');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(router);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use(errors());
app.use(errorCheck);

app.use(helmet());

app.listen(PORT);
