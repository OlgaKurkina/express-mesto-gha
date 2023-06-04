const SECRET_KEY = 'some-secret-key';

const regex = /https?:\/\/(www\.)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;

module.exports = {
  SECRET_KEY,
  regex,
};
