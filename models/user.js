const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальное количетсво символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальное количетсво символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
