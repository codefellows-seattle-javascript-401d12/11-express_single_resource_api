'use strict';

const createError = require('http-errors');
const debug = require('debug')('simple_resource:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.generate = function(schemaName, item){
  debug('storage:generate');
  if(!schemaName) return Promise.reject(createError(400, 'schemaName required!'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  //check if dir schemaName exist? if not create one.
  var create = function(){
    var dir = fs.readdirSync('./data').filter(function(value){
      return value == schemaName;
    })[0];

    if(!dir) {
      fs.mkdirSync(`./data/${schemaName}`);
    }
    return Promise.resolve(dir);
  };

  return create().then(() => {
    var json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item )
    .catch( err => Promise.reject(createError(500, err.message)));

  }).catch( err => Promise.reject(createError(500, err.message)));

};

exports.fetch = function(schemaName, id){
  debug('storage:fetch');
  if(!id) Promise.reject(createError(400, 'id expected'));
  if(!schemaName) return Promise.reject(createError(400, 'schemaName required!'));


  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    if(!data) return Promise.reject(createError(404, 'file empty'));
    return Promise.resolve(data.toString('utf8'));
  })
  .catch(() => Promise.reject(createError(404, 'not found')));
};

exports.put = function(schemaName, item){
  debug('storage:put');
  if(!item.id) Promise.reject(createError(400, 'id expected as request body'));
  if(!schemaName) Promise.reject(createError(400, 'schemaName expected as request body'));
  console.log('\nitem: ', item);

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`)
  .then(resource => {
    resource = JSON.parse(resource.toString('utf-8'));
    if(item.topic)  resource.topic = item.topic;
    if(item.book)  resource.book = item.book;
    if(item.instructor)  resource.instructor = item.instructor;

    return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify( resource))
    .then(() => item)
    .catch( err => Promise.reject(createError(500, err.message)));
  })
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.del = function(schemaName, id){
  debug('storage:del');
  if(!id) Promise.reject(createError(400, 'id expected'));
  if(!schemaName) return Promise.reject(createError(400, 'schemaName required!'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
   .then( () => Promise.resolve('file deleted!'))
  .catch(err => Promise.reject(createError(500, err.message)));
};
