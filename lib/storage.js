'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');

module.exports = exports = {};

exports.createEntry = function(schemaName, entry) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!entry) return Promise.reject(createError(400, 'expected entry data'));

  let json = JSON.stringify(entry);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${entry.id}.json`, json)
  .then( () => entry)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchEntry = function(schemaName, id) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let entry = JSON.parse(data.toString());
      return entry;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    };
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.fetchAll = function(schemaName) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));

  // return array of saved filenames whose names (minus the '.json' filename extention) match vehicle IDs
  return fs.readdirProm(`${__dirname}/../data/${schemaName}/`)
  .then( fileNames => {
    try {
      var ids = [];
      fileNames.forEach( fileName => {
        // remove '.json' filename extention from array of IDs, push to new array to print to users' CLI
        ids.push(fileName.replace('.json', ''));
      });
      return ids;

    } catch (err) {
      return Promise.reject(err);
    };
  })
  .catch( err => Promise.reject(err));
};

exports.deleteEntry = function(schemaName, id) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));
};
