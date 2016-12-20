'use strict';

const debug = require('debug')('student:constructor');
const uuid = require('node-uuid');

module.exports = function(student) {
  debug('Student constructor.');
  
  this.id = uuid.v4();
  Object.keys(student).forEach(key => {
    this[key] = student[key];
  });
};
