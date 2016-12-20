'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('student:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('Post student using storage.createItem.');

  if (!schemaName) return Promise.reject(createError(400, 'No schema name provided.'));
  if (!item) return Promise.reject(createError(400, 'No student provided.'));
  if (!item.age) return Promise.reject(createError(400, 'No student age provided.'));
  if (!item.name) return Promise.reject(createError(400, 'No student name provided.'));

  var data = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, data)
  .then(() => Promise.resolve(data))
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.getItem = function(schemaName, id) {
  debug('Get student ID using storage.getItem.');

  if (!schemaName) return Promise.reject(createError(400, 'No schema name provided.'));
  if (!id) return Promise.reject(createError(400, 'No ID provided.'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => Promise.resolve(data.toString()))
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
  debug('Delete student by ID using storage.deleteItem.');

  if (!schemaName) return Promise.reject(createError(400, 'No schema name provided.'));
  if (!id) return Promise.reject(createError(400, 'No ID provided.'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(() => Promise.resolve())
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.getAllItems = function(schemaName) {
  debug('Get all student IDs using storage.getAllItems.');

  if (!schemaName) return Promise.reject(createError(400, 'No schema name provided.'));

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then(arrayOfFiles => Promise.resolve(arrayOfFiles.toString().slice(9).split('.json').join('').split(',').filter(element => element !== '.json')))
  .catch(err => Promise.reject(createError(500, err.message)));
};
