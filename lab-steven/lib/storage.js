'use strict';

const Promise = require('bluebird');
const debug = require('debug')('student:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('Post student using storage.createItem.');

  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!item) return Promise.reject(new Error('No item provided.'));
  if (!item.age) return Promise.reject(new Error('Student has no age field.'));
  if (!item.name) return Promise.reject(new Error('Student has no name field.'));

  var data = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, data)
  .then(() => Promise.resolve(data))
  .catch(err => Promise.reject(err));
};

exports.getItem = function(schemaName, id) {
  debug('Get student ID using storage.getItem.');

  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!id) return Promise.reject(new Error('No ID provided.'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => Promise.resolve(data.toString()))
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  debug('Delete student by ID using storage.deleteItem.');

  if (!schemaName) return Promise.reject(new Error('No schema name provided.'));
  if (!id) return Promise.reject(new Error('No ID provided.'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(() => Promise.resolve())
  .catch(err => Promise.reject(err));
};

exports.getAllItems = function(schemaName) {
  debug('Get all student IDs using storage.getAllItems.');
  
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then(arrayOfFiles => {
    return Promise.resolve(arrayOfFiles.toString().slice(9).split('.json').join('').split(',').filter(element => element !== '.json'));
  })
  .catch(err => Promise.reject(err));
};
