const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { craeteUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://polezhaevrmesto.nomoredomainsrocks.ru',
  'https://polezhaevrmesto.nomoredomainsrocks.ru',
];

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.some((e) => e.test && e.test(origin)) || allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose
  .set('strictQuery', false)
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, craeteUser);
app.post('/signin', validateLogin, login);
app.use(auth);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use(errorLogger);
app.use(limiter);

app.use('*', (req, res, next) => next(new NotFound('Такая страница не существует.')));
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
