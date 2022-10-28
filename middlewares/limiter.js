const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000, // 1 sec
  max: 2, // Limit each IP to 1 requests per `window` (here, per 1 sec)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов в секунду',
});

module.exports = limiter;
