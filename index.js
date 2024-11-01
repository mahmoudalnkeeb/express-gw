// load .env file and app configurations
const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV || 'production';
const morganFormat = env == 'development' ? 'dev' : 'common';

// pkgs & libs
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const notfoundMw = require('./mws/notfound.mw');
const errorMw = require('./mws/error.mw');
const gatewayRouter = require('./routes/gateway');

const gw = express();

// mws
gw.use(cors({ origin: process.env.ORIGINS || '*' }));
gw.use(helmet());
gw.use(morgan(morganFormat));

// setup router
gw.use(gatewayRouter);

// error handling mws
gw.use(notfoundMw);
gw.use(errorMw);

// run the app
const port = process.env.PORT || 8080;

gw.listen(port, () => {
  console.log(`API GATEWAY STARTED ON PORT 0.0.0.0:${port}`);
});

module.exports = gw;
