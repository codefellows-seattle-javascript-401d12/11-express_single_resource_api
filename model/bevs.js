'use strict';

// Model for data on Battery-Electric Vehicles (BEVs)

const uuid = require('node-uuid');

module.exports = function(vehicle, info) {
  if (!vehicle) throw new Error('expected vehicle model name');
  if (!info) throw new Error('expected vehicle model info');

  this.id = uuid.v1();
  this.vehicle = vehicle;
  this.info = info;
};
