const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
