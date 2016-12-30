'use strict';
console.log(process.env.DEBUG);
const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('simple_resource:server');
const jsonParser = require('body-parser').json();

const resource = require('./model/resource.js');
const storage = require('./lib/storage.js');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.post('/api/simple_resource', jsonParser, function(req, res, next){
  debug('POST /api/simple_resource');

  resource.create(req.body)
  .then(resource => res.json(resource))
  .catch(err => next(err));
});

app.get('/api/simple_resource', function(req, res, next){
  debug('GET /api/simple_resource');

  storage.fetch('simple_resource', req.query.id)
  .then(resource => res.json(resource))
  .catch(err => next(err));
});

app.put('/api/simple_resource', jsonParser, function(req, res, next){
  debug('PUT /api/simple_resource');

  storage.put('simple_resource', req.body)
  .then(resource => res.json(resource))
  .catch( err => next(err));
});

app.delete('/api/simple_resource', function(req, res, next){
  debug('DELETE /api/simple_resource');


  storage.del('simple_resource', req.query.id)
  .then(msg =>{
    res.json(msg);
  })
  .catch( err => next(err));
});

app.listen(PORT, () => {
  console.log(`surver PORT: ${PORT} on!!`);
});
