'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const BEV = require('../model/bevs.js');

require('../server.js');

describe('BEV Routes', function() {
  var vehicle = null;

  var testVehicleEntry = {
    vehicle: 'Test Vehicle',
    info: 'Test vehicle info',
    range: 100
  };

  describe('POST: api/bev', function() {
    it('should throw a 400 \'bad request\' error', function(done) {
      request.post('http://localhost:3000/api/bev')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return a vehicle info entry', function(done) {
      request.post('http://localhost:3000/api/bev')
      .send(testVehicleEntry)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.vehicle).to.equal('Test Vehicle');
        expect(res.body.info).to.equal('Test vehicle info');
        expect(res.body.range).to.equal(100);
        expect(res.body.range).to.be.a('number');
        vehicle = res.body;
        done();
      });
    });
  });

  describe('GET: api/bev?id=test_id', function() {
    it('should throw a 404 \'not found\' error', function(done) {
      request.get('http://localhost:3000/api/bev?id=foo-bar')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should return a vehicle info entry', function(done) {
      request.get(`http://localhost:3000/api/bev?id=${vehicle.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.vehicle).to.equal('Test Vehicle');
        expect(res.body.info).to.equal('Test vehicle info');
        done();
      });
    });
  });

  describe('GET: api/bev', function() {
    it('should return an array of entry ids', function(done) {
      request.get('http://localhost:3000/api/bev')
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
      request.delete(`http://localhost:3000/api/bev?id=${vehicle.id}`)
      .end((err, res) => {
        if (err) return done(err);
        // not sure how to get a 204 with the refactor. But both 200 and 204 seem to be a common convention for successful DELETE requests.
        expect(res.status).to.equal(200 || 204);
        expect(res.body).to.be.empty;
        done();
      });
    });
  });
});
