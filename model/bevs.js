'use strict';

// Model for data on Battery-Electric Vehicles (BEVs)

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('bev:bev');
const storage = require('../lib/storage.js');

const BEV = module.exports = function(vehicle, info, range) {
  debug('BEV constructor');

  if (!vehicle) throw createError(400, 'expected vehicle model name');
  if (!info) throw createError(400, 'expected vehicle model info');
  if (!range) throw createError(400, 'expected vehicle model range');
  if (isNaN(range)) throw createError(400, 'expected range to be a number');

  this.id = uuid.v1();
  // vehicle make, model
  this.vehicle = vehicle;
  // general vehicle description
  this.info = info;
  // EPA-tested range on a single battery charge, in miles
  // range must be a number
  this.range = range;
};

BEV.createVehicle = function(_vehicle) {
  debug('createVehicle');

  try {
    let bev = new BEV(_vehicle.vehicle, _vehicle.info, _vehicle.range);
    return storage.createEntry('bev', bev);
  } catch (err) {
    return Promise.reject(err);
  };
};

BEV.fetchVehicle = function(id) {
  debug('fetchVehicle');
  return storage.fetchEntry('bev', id);
};

BEV.fetchAllVehicles = function() {
  debug('fetchAllVehicles');
  return storage.fetchAll('bev');
};

BEV.deleteVehicle = function(id) {
  debug('deleteVehicle');
  return storage.deleteEntry('bev', id);
};
