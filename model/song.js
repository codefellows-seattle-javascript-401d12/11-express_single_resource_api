'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('song:song');
const storage = require('../lib/storage.js');

const Song = module.exports = function(title, description) {
  debug('song constructor');

  if (!title) throw createError(400, 'expected title');
  if (!description) throw createError(400, 'expected description');

  this.id = uuid.v1();
  this.title = title;
  this.description = description;
};

Song.createSong = function(_song) {
  debug('createSong');

  try {
    let song = new Song(_song.title, _song.description);
    return storage.createItem('song', song);
  } catch (err) {
    return Promise.reject(err);
  }
};

Song.fetchSong = function(id) {
  debug('fetchSong');
  return storage.fetchItem('song', id);
};

Song.deleteSong = function(id) {
  debug('deleteSong');
  return storage.deleteItem('song', id);
};
