const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnAuthorized = require('../utils/errors/UnAuthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальное количетсво символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальное количетсво символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный адрес',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальное количетсво символов - 2'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorized('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAuthorized('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
