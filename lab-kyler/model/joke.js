'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('joke:joke');
const storage = require('../lib/diskStorage.js');

const Joke = module.exports = function(setup, punchline) {
  debug('joke constructor'); //just gives a name

  if (!setup) throw createError(400, 'bad request');
  if (!punchline) throw createError(400, 'bad request');

  this.id = uuid.v1();
  this.setup = setup;
  this.punchline = punchline;
  return;
};

Joke.createJoke = function(_joke) { //we'll use 'joke' for something else - don't want a conflict
  debug('createJoke'); //just helps us know where the debug is coming from.

  try {
    let joke = new Joke(_joke.setup, _joke.punchline);
    return storage.storeItem('joke', joke);
  } catch (err) {
    return Promise.reject(err);
  }
};//this is a static method - not attached to constructor - a prototype method would be on every instance.

Joke.fetchJoke = function(id) {
  debug('fetchJoke');

  return storage.fetchItem('joke', id);
};

Joke.deleteJoke = function(id) {
  debug('deleteJoke');

  return storage.deleteItem('joke', id);
};
