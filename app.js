const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
require('dotenv').config();
const { allowedCors } = require('./consts/allowedCors');
const mainRouter = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const errorsHandler = require('./errors/errorsHandler');

const { NODE_ENV, MONGO_SERVER } = process.env;
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_SERVER : 'mongodb://localhost:27017/moviesdb');

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
