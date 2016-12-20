'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('recipe:server');

const app = express();
const Recipe = require('./model/recipe.js');
const PORT = process.env.PORT || 3000;


app.use(morgan('dev'));

// POST ROUTE ---------------------------------------
app.post('/api/recipe', jsonParser, function(req, res, next) {
  debug('POST: /api/recipe');

  if(!req.body) {
    res.status(400).send();
    return;
  }
  Recipe.createRecipe(req.body)
  .then( recipe => res.json(recipe))
  .catch( err => next(err));
});

// GET ROUTE ----------------------------------------
app.get('/api/recipe', function(req, res, next) {
  debug('GET: /api/recipe');

  Recipe.getRecipe(req.query.id)
  .then( recipe => res.json(recipe))
  .catch( err => next(err));
});

// DELETE ROUTE -------------------------------------
app.delete('/api/recipe', function(req, res, next) {
  debug('DELETE: /api/recipe');

  Recipe.deleteRecipe(req.query.id)
  .then( () => res.status(204).send())
  .catch( err => next(err));
});

// ERROR MIDDLEWARE ---------------------------------
// eslint-disable-next-line
app.use(function(err, req, res, next) {
  debug('error middleware');

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`Recipe box up and running on ${PORT}`);
});
