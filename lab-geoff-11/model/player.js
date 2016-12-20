'use strict';

const createError = require('http-errors');

const debug = require('debug')('mnp:player');

const storage = require('../lib/storage.js');

function Player(name, email) {
  debug(`new player, name=${name} email=${email}`);

  if(!name)  throw createError(400, 'missing name param');
  if(!email) throw createError(400, 'missing email param');
  this.name = name;
  this.email = email;
}

Player.create = function(_player) {
  debug('create');

  //NOTE: We could try the player constructor, but
  //      we are catching errors down the call stack.
  let player = new Player(_player.name, _player.email);
  return storage.createItem('player', player);
};

Player.fetch = function(id) {
  debug('fetch');
  return storage.fetchItem('player', id);
};

Player.delete = function(id) {
  debug('delete');
  return storage.deleteItem('player', id);
};

module.exports = Player;
