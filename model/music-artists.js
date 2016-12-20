'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('music-artist:music-artist');
const storage = require('../lib/storage.js');

const Artist = module.exports = function(name, genre) {
  debug('artist constructor');

  if(!name) throw createError(400, 'expected artist name');
  if(!genre) throw createError(400, 'expected genre');

  this.id = uuid.v1();
  this.name = name;
  this.genre = genre;
};

Artist.createArtist = function(_artist) {
  debug('createArtist');

  try {
    let artist = new Artist(_artist.name, _artist.genre);
    return storage.createItem('artist', artist);
  } catch (err) {
    return Promise.reject(err);
  }
};

Artist.fetchArtist = function(id) {
  debug('fetchArtist');
  return storage.fetchItem('artist', id);
};
