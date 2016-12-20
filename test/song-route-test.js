'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Song Routes', function() {
  var song = null;

  describe('POST: /api/song', function() {
    it('should return a 400 bad request if no body is given', function(done) {
      request.post('localhost:3000/api/song')
      .send({})
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.text).to.equal('BadRequestError');
        expect(res.body.id).to.equal(undefined);
        done();
      });
    });
    it('should return a 400 bad request an invalid body is requested', function(done) {
      request.post('localhost:3000/api/song')
      .send({ meow: 'meow meow meow', robot: 'beep beep boop' })
      .end((err, res) => {
        expect(res.text).to.equal('BadRequestError');
        expect(res.body.id).to.equal(undefined);
        done();
      });
    });
    it('should return a song', function(done) {
      request.post('localhost:3000/api/song')
      .send({ title: 'test title', description: 'test description' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('test title');
        expect(res.body.description).to.equal('test description');
        song = res.body;
        done();
      });
    });
  });

  describe('GET: /api/song', function() {
    it('should return a song', function(done) {
      request.get(`localhost:3000/api/song?id=${song.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('test title');
        expect(res.body.description).to.equal('test description');
        done();
      });
    });
    it('should return a 404 not found for a valid request but an invalid id', function(done) {
      request.get('localhost:3000/api/song?id=44abc123')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
    it('should return a 400 bad request if id is not provided', function(done) {
      request.get('localhost:3000/api/song')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        expect(res.body.id).to.equal(undefined);
        done();
      });
    });
  });

  describe('testing for routes not registered', function() {
    it('should return a status code of 404', function(done) {
      request.get('localhost:3000/api/movie')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot GET /api/movie\n');
        done();
      });
    });
  });
});
