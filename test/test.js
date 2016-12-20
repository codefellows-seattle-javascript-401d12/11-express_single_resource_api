'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const PORT = process.env.PORT || 3000;

describe('Data Routes and Methods', function() {
  let data = null;

  describe('POST: /api/ski', function() {

    it('should create a new data object', function(done) {
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
      request.get(`localhost:${PORT}/api/ski?id=1`)
        .end( (res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should return a bad request 400 error', function(done) {
      request.get(`localhost:${PORT}/api/ski?i`)
        .end( (res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

  });

  describe('DELETE: /api/ski?id=<UNIQUE ID>', function() {

    it('should delete the requested data object and return 204', function(done) {
      request.delete(`localhost:${PORT}/api/ski?id=${data.id}`)
        .end( (err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });

  });
});
