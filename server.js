'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('song:server');

const Song = require('./model/song');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/song', jsonParser, function(req, res, next) {
  debug('POST: /api/song');

  Song.createSong(req.body)
  .then( song => res.json(song))
  .catch( err => next(err));
});

app.get('/api/song', function(req, res, next) {
  debug('GET: /api/song');

  Song.fetchSong(req.query.id)
  .then( song => res.json(song))
  .catch( err => next(err));
});

app.delete('/api/song', (req, res, next) => {
  debug('DELETE: /api/song');

  Song.deleteSong(req.query.id)
  .then( song => res.json(song))
  .catch( err => next(err));
});

// eslint-disable-next-line
app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
