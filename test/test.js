'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('ski:test');
const PORT = process.env.PORT || 3000;

describe('Data Routes and Methods', function() {
  let data = null;

  describe('POST: /api/ski', function() {

    it('should create a new data object', function(done) {
      debug('POST: /api/ski test 1');

      request.post(`localhost:${PORT}/api/ski`)
        .send({location: 'Mt Baker', rating: 10})
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal('Mt Baker');
          expect(res.body.rating).to.equal(10);
          data = res.body;
          done();
        });
    });

    it('should Not create a new data object', function(done) {
      debug('POST: /api/ski test 2');

      request.post(`localhost:${PORT}/api/ski`)
        .send({location: 'Mt Baker'})
        .end( (res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

  });

  describe('GET: /api/ski?id=<UNIQUE ID>', function() {

    it('should get the requested data object', function(done) {
      debug('GET: /api/ski?id=<UNIQUE ID> test 1');

      request.get(`localhost:${PORT}/api/ski?id=${data.id}`)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.location).to.equal('Mt Baker');
          expect(res.body.rating).to.equal(10);
          done();
        });
    });

    it('should return a 404 error', function(done) {
      debug('GET: /api/ski?id=<UNIQUE ID> test 2');

      request.get(`localhost:${PORT}/api/ski?id=1`)
        .end( (res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should return a bad request 400 error', function(done) {
      debug('GET: /api/ski?id=<UNIQUE ID> test 3');

      request.get(`localhost:${PORT}/api/ski?i`)
        .end( (res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

  });

  describe('DELETE: /api/ski?id=<UNIQUE ID>', function() {

    it('should delete the requested data object and return 204', function(done) {
      debug('DELETE: /api/ski?id=<UNIQUE ID> test 1');

      request.delete(`localhost:${PORT}/api/ski?id=${data.id}`)
        .end( (err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });

    it('should return a bad request 400 error', function(done) {
      debug('DELETE: /api/ski?id=<UNIQUE ID> test 2');

      request.delete(`localhost:${PORT}/api/ski?id=12345`)
        .end( (err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

  });
});
