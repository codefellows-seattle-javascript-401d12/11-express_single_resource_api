'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('spiritAnimal:spiritAnimal');
const storage = require('../lib/storage.js');

const SpiritAnimal = module.exports = function(name, spiritAnimal, spiritAnimalName) {
  debug('spirit animal constructor');

  if (!name) throw createError(400, 'expected name');
  if (!spiritAnimal) throw createError(400, 'expected spirit animal');
  if (!spiritAnimalName) throw createError(400, 'expected favorite animal');

  this.id = uuid.v1();
  this.name = name;
  this.spiritAnimal = spiritAnimal;
  this.spiritAnimalName = spiritAnimalName;
};

SpiritAnimal.createSpiritAnimal = function (_spiritAnimal) {
  debug('createItem -- spiritAnimal.js');

  try {
    let spiritAnimal = new SpiritAnimal(_spiritAnimal.name, _spiritAnimal.spiritAnimal, _spiritAnimal.spiritAnimalName);
    return storage.createItem('spiritAnimal', spiritAnimal);
  } catch (err) {
    return Promise.reject(err);
  }
};

SpiritAnimal.fetchSpiritAnimal = function(id) {
  debug('fetchSpiritAnimal');

  return storage.fetchItem('spiritAnimal', id);
};

SpiritAnimal.deleteSpiritAnimal = function(id) {
  debug('deleteSpiritAnimal');

  return storage.deleteItem('spiritAnimal', id);
};
