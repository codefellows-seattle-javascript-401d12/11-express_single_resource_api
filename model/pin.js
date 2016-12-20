'use strict';

const uuid = require('node-uuid');

module.exports = function(title, skill) {
  if (!title) throw new Error('expected title');
  if (!skill) throw new Error('expected skill');

  this.id = uuid.v1();
  this.title = title;
  this.skill = skill;
};
