'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('joke:joke');
const storage = require('../lib/diskStorage.js');

const Joke = module.exports = function(setup, punchline) {
  debug('joke constructor');

  if (!setup) throw createError(400, 'bad request');
  if (!punchline) throw createError(400, 'bad request');

  this.id = uuid.v1();
  this.setup = setup;
  this.punchline = punchline;
  return;
};

Joke.createJoke = function(_joke) {
  debug('createJoke');

  try {
    let joke = new Joke(_joke.setup, _joke.punchline);
    return storage.storeItem('joke', joke);
  } catch (err) {
    return Promise.reject(err);
  }
};

Joke.fetchJoke = function(id) {
  debug('fetchJoke');

  return storage.fetchItem('joke', id);
};

Joke.deleteJoke = function(id) {
  debug('deleteJoke');

  return storage.deleteItem('joke', id);
};
