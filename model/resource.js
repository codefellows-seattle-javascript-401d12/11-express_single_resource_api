'use strict';
const uuid = require('node-uuid');
const storage = require('../lib/storage.js');
const debug = require('debug')('simple_resource:resource');
const createError = require('http-errors');


module.exports = exports = function(topic, book, instructor){
  if(!topic) return Promise.reject(createError(400, 'topic required!'));
  this.id = uuid.v1();
  this.topic = topic;
  this.book = book;
  this.instructor = instructor;
};

exports.create = function(_Simple_resource){
  debug('resource:create');
  try{
    var resource =  new exports(_Simple_resource.topic, _Simple_resource.book, _Simple_resource.instructor);
    return storage.generate('simple_resource', resource);
  }catch(err){
    return Promise.reject(createError(500, err.message));
  }

};
