'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('ski:ski-data');
const createError = require('http-errors');


const SkiData = module.exports = function(location, rating) {
  debug('SkiData Constructor');

  if(!location) throw createError(400, 'expected location data');
  if(!rating) throw createError(400, 'expected rating data');

  this.location = location;
  this.rating = rating;
  this.id = uuid.v1();
};

SkiData.createData = function(_data) {
  debug('createData');

  try {
    let skiData = new SkiData (_data.location, _data.rating);
    // TODO: return data.createItem('skiData', skiData)
  } catch(err) {
    return Promise.reject(err);
  }
};

SkiData.getData = function() {
  debug('getData');

  // TODO: return item from data.getItem('skiData' _id)
};
