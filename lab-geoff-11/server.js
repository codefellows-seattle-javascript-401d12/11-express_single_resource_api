'use strict';

const express = require('express');
const morgan  = require('morgan');
const createError = require('http-errors');
const parseJSON = require('body-parser').json();
const debug = require('debug')('mnp:server');

const Player = require('./model/player.js');

const app = express();
const PORT = process.env.PORT || 5555;

app.use(morgan('dev'));

app.post('/api/player', parseJSON, function(req, res, next) {
  debug('POST: /api/player');
  debug('req.body:', req.body);
  Player.create(req.body)
  .then( player => res.json(player))
  .catch( err => next(err));
});

app.get('/api/player', function(req, res, next) {
  debug('GET: /api/player id:', req.query.id);
  Player.fetch(req.query.id)
  .then( player => res.json(player))
  .catch( err => next(err));
});

app.delete('/api/player', function(req, res, next) {
  debug('DELETE: /api/player id:', req.query.id);
  Player.delete(req.query.id)
  .then( () => {
    res.status(204).send('');
  })
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.message);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log('server up:', PORT);
});
