'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('cheese:cheese');
const storage = require('../lib/storage.js');

const Cheese = module.exports = function(color, pokableness) {
  debug('cheese constructor');

  if (!color) throw createError(400, 'expected name');
  if (!pokableness) throw createError(400, 'expected content');

  this.id = uuid.v1();
  this.color = color;
  this.pokableness = pokableness;
};

Cheese.createCheese = function(_cheese) {
  debug('createCheese');

  try {
    let cheese = new Cheese(_cheese.color, _cheese.pokableness);
    return storage.createItem('cheese', cheese);
  } catch (err) {
    return Promise.reject(err);
  }
};

Cheese.fetchCheese = function(id) {
  debug('fetchCheese');
  console.log('::: reached cheese.js fetchCheese');
  return storage.fetchItem('cheese', id);
};

Cheese.deleteCheese = function(id) {
  debug('deleteCheese');
  return storage.deleteItem('cheese', id);
};
