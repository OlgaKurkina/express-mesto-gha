const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ owner: req.user._id, name, link })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      if (err.message === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .populate('owner')
  .orFail(() => {
    throw new Error('NotFound');
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .populate('owner')
  .orFail(() => {
    throw new Error('NotFound');
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  });
