'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('BEV Routes', function() {
  var vehicle = null;

  describe('POST: api/bev', function() {
    it('should throw a 400 \'bad request\' error', function(done) {
      request.post('localhost:3000/api/bev')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });

    it('should return a vehicle info entry', function(done) {
      request.post('localhost:3000/api/bev')
      .send({ vehicle: 'Test Vehicle', info: 'Test info' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.vehicle).to.equal('Test Vehicle');
        expect(res.body.info).to.equal('Test info');
        vehicle = res.body;
        done();
      });
    });
  });

  describe('GET: api/bev?id=test_id', function() {
    it('should throw a 404 \'not found\' error', function(done) {
      request.get(`localhost:3000/api/bev?id=foo-bar`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('resource not found');
        done();
      });
    });

    it('should return a vehicle info entry', function(done) {
      request.get(`localhost:3000/api/bev?id=${vehicle.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.vehicle).to.equal('Test Vehicle');
        expect(res.body.info).to.equal('Test info');
        done();
      });
    });
  });

  describe('GET: api/bev', function() {
    it('should return an array of entry ids', function(done) {
      request.get('localhost:3000/api/bev')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        // expect filenames to be sorted in alpha. order.
        // thus, latest filename will be in random position in array
        expect(res.body).to.include(vehicle.id);
        done();
      });
    });
  });

  describe('DELETE: api/bev', function() {
    it('should delete the test vehicle info entry', function(done) {
      request.delete(`localhost:3000/api/bev?id=${vehicle.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.empty;
        done();
      });
    });
  });
});
