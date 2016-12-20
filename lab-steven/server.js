'use strict';

const express = require('express');
const parseJSON = require('body-parser').json();
const storage = require('./lib/storage.js');
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/api/student', (request, response, next) => {
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
