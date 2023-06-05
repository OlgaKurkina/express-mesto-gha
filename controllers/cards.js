const Card = require('../models/card');
const {
  NotFoundError,
  BadRequest,
  Forbidden,
} = require('../utils/errors/errors');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ owner: req.user._id, name, link })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные'));
      } return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new Forbidden('Нет прав на удаление карточки'));
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .populate('owner')
  .then((card) => {
    if (!card) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные'));
    }
    return next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .populate('owner')
  .then((card) => {
    if (!card) {
      return next(new NotFoundError('Карточка не найдена'));
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные'));
    }
    return next(err);
  });
