'use strict';

const debug = require('debug')('ski:server');
const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const parseJson = require('body-parser').json();
const PORT = process.env.PORT || 3000

app.use(morgan('dev'));

app.get();

app.post();

app.delete();

app.listen(PORT, () => {
  console.log(`Server up: ${PORT}`);
});
