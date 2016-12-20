'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('ski:data');
const createError = require('http-errors');

module.exports = exports = {};

exports.setItem = function(schemaName, item) {
  debug('setItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item )
    .catch( err => Promise.reject(createError(500, err.message)));
};

exports.getItem = function(schemaName, id) {
  debug('getItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      let item = JSON.parse(data.toString());
      return item;
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch( err => Promise.reject(createError(404, err.message)));
};
