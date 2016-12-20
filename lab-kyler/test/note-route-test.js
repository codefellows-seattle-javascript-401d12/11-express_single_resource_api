'use strict';

const request = require('superagent');
const expect = require('chai').expect;
require('../server.js');

//var testJoke = {setup: 'I just flew in from Chernobyl', punchline: 'and boy, are my arms legs!'};
//var testJoke = {setup: 'Why did the console player cross the road?', punchline: 'To render the buildings on the other side.'};
//var testJoke = {setup: 'My physics teacher said I had potential', punchline: 'then he pushed me down the stairs.'};
var testJoke = {setup: 'Sting was kidnapped last night!', punchline: 'The Police are looking for a lead.'};

describe('Route: /api/joke', function() {

  describe('GET-ing a nonexistent joke ID', function() {
    it('should respond with "not found" for valid requests made with an id that was not found', function (done) {
      request.get('localhost:2000/api/joke?id=abc123')
      .end( (err, res) => {
        if (err.status !== 404) done(err);
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });

  describe('POST-ing a hilarious joke', function() {
    it('should return status 200 and a JSON joke', function (done) {
      request.post('localhost:2000/api/joke')
      .send({setup: testJoke.setup, punchline: testJoke.punchline})
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(typeof res.body.id).to.equal('string');
        expect(res.body.setup).to.equal(testJoke.setup);
        expect(res.body.punchline).to.equal(testJoke.punchline);
        testJoke.id = res.body.id;
        done();
      });
    });
  });

  describe('GET-ing without a joke ID', function() {
    it('should return status 200 and a list of joke IDs (extra credit)', function (done) {
      request.get('localhost:2000/api/joke')
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(typeof res.body).to.equal('object');
        done();
      });
    });
  }); //Extra credit!

  describe('GET-ing a valid joke ID', function() {
    it('should return status 200 and a funny', function (done) {
      request.get(`localhost:2000/api/joke?id=${testJoke.id}`)
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(testJoke.id);
        expect(res.body.setup).to.equal(testJoke.setup);
        expect(res.body.punchline).to.equal(testJoke.punchline);
        done();
      });
    });
  });

  describe('DELETE-ing a valid joke ID', function() {
    it('should return status 204', function (done) {
      request.delete(`localhost:2000/api/joke?id=${testJoke.id}`)
      .end( (err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  describe('POST-ing an invalid joke', function() {
    it('should return status 400 and body "bad request"', function (done) {
      request.post('localhost:2000/api/joke')
      .send('anything dane cook has ever said')
      .end( (err, res) => {
        if (err.status !== 400) done(err);
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

});
