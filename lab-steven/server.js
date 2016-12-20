'use strict';

const express = require('express');
const parseJSON = require('body-parser').json();
const morgan = require('morgan');
const createError = require('http-errors');
const debug = require('debug')('student:server');
const Student = require('./model/student-constructor.js');
const storage = require('./lib/storage.js');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

app.get('/api/student', (request, response, next) => {
  debug('GET: /api/student');

  if (request.query.id) {
    storage.getItem('student', request.query.id)
    .then(student => response.json(student))
    .catch(err => next(err));
    return;
  }
  storage.getAllItems('student')
  .then(allIds => response.json(allIds))
  .catch(err => next(err));
});

app.post('/api/student', parseJSON, (request, response, next) => {
  debug('POST: /api/student');

  var student = new Student(request.body);
  storage.createItem('student', student)
  .then(student => response.status(200).send(student))
  .catch(err => next(err));
});

app.delete('/api/student', (request, response, next) => {
  debug('DELETE: /api/student');

  if (request.query.id) {
    storage.deleteItem('student', request.query.id)
    .then(() => response.status(204).send())
    .catch(err => next(err));
  }
});

app.use((err, request, response, next) => { //eslint-disable-line
  debug('Middleware error function.');

  console.error(err.message);

  if(err.status) {
    response.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  response.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
