'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('music-artists:server');

const app = express();
const Artist = require('./model/music-artists.js');
const PORT = 3000; //process.env.PORT ||

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({'msg': 'connected via test route'});
});

app.post('/api/artist', jsonParser, function(req, res, next) {
  debug('POST: /api/artist');

  Artist.createArtist(req.body)
  .then( artist => res.json(artist))//TODO double check thi
  .catch( err => next (err));
});

app.get('/api/artist', function(req, res, next) {
  debug('GET: /api/artist');

  Artist.fetchArtist(req.query.id)
  .then( artist => res.json(artist))
  .catch( err => next (err));
});

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

app.delete('/api/artist', function(req, res, next) {
  debug('DELETE: /api/artist');

  Artist.deleteArtist(req.query.id)
  .then( () => res.status(204).send())
  .catch( err => next (err));

});

app.listen(PORT, () => {
  console.log(`server live on: ${PORT}`);
});
