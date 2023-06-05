const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../utils/errors/errors');

const { SECRET_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnAuthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
