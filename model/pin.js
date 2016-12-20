'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('pin:pin');
const storage = require('../lib/storage.js');

const Pin = module.exports = function(title, skill) {
  debug('pin constructor');

  if (!title) throw createError(400, 'expected title');
  if (!skill) throw createError(400, 'expected skill');

  this.id = uuid.v1();
  this.title = title;
  this.skill = skill;
};

Pin.createPin = function(_pin) {
  debug('createPin');

  try {
    let pin = new Pin(_pin.title, _pin.skill);
    return storage.createItem('pin', pin);
  } catch (err) {
    return Promise.reject(err);
  }
};

Pin.fetchPin = function(id) {
  debug('fetchPin');
  return storage.fetchItem('pin', id);
};

Pin.deletePin = function(id) {
  debug('deletePin');
  return storage.deleteItem('pin', id);
};
