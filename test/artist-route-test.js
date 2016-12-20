'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Artist Routes', function() {
  var artist = null;

  describe('POST: /api/artist', function() {
    it('should return a artist', function(done) {
      request.post('localhost:3000/api/artist')
      .send({name: 'test name', genre: 'test genre'})
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('test name');
        expect(response.body.genre).to.equal('test genre');
        artist = response.body;
        done();
      });
    });
    it('should throw error with no body found', function(done) {
      request.post('localhost:3000/api/artist')
      .send({invalid: 'invalid body'})
      .end((err, response) => {
        // if (err) return done(err);
        expect(response.text).to.equal('BadRequestError');
        expect(response.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/artist', function() {
    it('should return a artist', function(done) {
      request.get(`localhost:3000/api/artist?id=${artist.id}`)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('test name');
        expect(response.body.genre).to.equal('test genre');
        done();
      });
    });
    it('should return 400 if no id found', function(done) {
      request.get('localhost:3000/api/artist?id')
      .end((err, response) => {
        expect(response.body.id).to.equal(undefined);
        expect(response.status).to.equal(400);
        done();
      });
    });
    it('should throw error if not found', function(done) {
      request.get('localhost:3000/')
      .end((err, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE: /api/artist', function() {
    it('should delete an artist', function(done) {
      request.delete(`localhost:3000/api/artist?id=${artist.id}`)
      .end((err, response) => {
        expect(response.status).to.equal(204);
        expect(response.body.name).to.equal(undefined);
        expect(response.body.genre).to.equal(undefined);
        done();
      });
    });
  });
});
