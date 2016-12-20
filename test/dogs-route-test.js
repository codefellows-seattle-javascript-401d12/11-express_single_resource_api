'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 8000;

require('../server.js');

describe('Dog Routes', function() {
  var dog = null;

  describe('POST: /api/dog', function() {
    it('should return a 200 with valid body', function(done) {
      request.post(`localhost:${PORT}/api/dog`)
      .send({name: 'test name', breed: 'test breed', color: 'test color'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.breed).to.equal('test breed');
        expect(res.body.color).to.equal('test color');
        dog = res.body;
        done();
      });
    });
    it('should return 400', function(done) {
      request.post(`localhost:${PORT}/api/dog`)
      .send({eyes: 'test eyes', feet: 'test feet', ears: 'test ears'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/dog', function() {
    it('should return a dog', function(done) {
      request.get(`localhost:${PORT}/api/dog?id=${dog.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.breed).to.equal('test breed');
        expect(res.body.color).to.equal('test color');
        done();
      });
    });
    it('should return 404', function (done) {
      request.get(`localhost:${PORT}/api/dog=?bad`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return 200', function(done) {
      request.get(`localhost:${PORT}/api/dog?id=${dog.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return 400 if no id provided', function(done) {
      request.get(`localhost:${PORT}/api/dog?id=`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('DELETE: /api/dog', function() {
    it('should delete dog', function(done) {
      request.delete(`localhost:${PORT}/api/dog?id=${dog.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

});
