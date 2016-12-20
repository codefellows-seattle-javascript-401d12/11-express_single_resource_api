'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Cheese Routes', function() {

  describe('POST: /data/cheese', function() {
    it('Should return a cheese', function(done) {
      request.post('localhost:3000/data/cheese')
      .send({ color: 'test color', pokableness: 'test pokableness'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.color).to.equal('test color');
        expect(res.body.pokableness).to.equal('test pokableness');
        done();
      });
    });
  });

  describe('GET: /data/cheese', function() {
    it('should return a cheese', function(done) {
      request.post('localhost:3000/data/cheese')
      .send({ color: 'test color', pokableness: 'test pokableness'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.color).to.equal('test color');
        expect(res.body.pokableness).to.equal('test pokableness');
        done();
      });
    });
  });

  describe('DELETE: /data/cheese', function() {
    // creating a cheese whose ID we can grab to delete for the test
    before ( function(done) {
      request.post('localhost:3000/data/cheese')
      .send({ color: 'test color', pokableness: 'test pokableness'})
      .end((err, res) => {
        this.cheese = res.body;
        done();
      });
    });
    it('should delete a cheese', function(done) {
      request.delete(`localhost:3000/data/cheese?id=${this.cheese.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  describe('GET request resulting in 404 error', function() {
    it('should return a 404 error when given an id for a missing or nonexistant file', function(done) {
      request.get('localhost:3000/data/cheese?id=404')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.include('NotFoundError');
        done();
      });
    });
  });

  describe('GET request resulting in 404 error', function() {
    it('should return a 404 error when given an id for an incorrect path', function(done) {
      request.get('localhost:3000/data/bread?id=404')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET request resulting in 400 error', function() {
    it('should respond with a bad request if user did not provide an id', function(done) {
      request.get('localhost:3000/data/cheese?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.include('BadRequestError');
        done();
      });
    });
  });

  describe('POST request resulting in 400 error', function() {
    it('should respond with bad request if no request body was provided or body was invalid', function(done) {
      request.post('localhost:3000/data/cheese')
      .send({ shape: 'test shape', texture: 'test texture'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.include('BadRequestError');
        done();
      });
    });
  });

});
