'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 8080;

require('../server.js');

describe ('Student routes', () => {
  var student = null;

  describe('POST: /api/student', () => {
    it('Should return a student when name and age are passed in', done => {
      request
      .post(`localhost:${PORT}/api/student`)
      .send({name: 'Steven', age: '30'})
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.text).to.be.a('string');
        student = JSON.parse(response.text);
        done();
      });
    });

    it('Should return a status of 400 and bad request with no body', done => {
      request
      .post(`localhost:${PORT}/api/student`)
      .end((err, response) => {
        expect(err).to.be.an('error');
        expect(response.status).to.equal(400);
        expect(response.body.id).to.equal(undefined);
        done();
      });
    });

    it('Should return a status of 400 and bad request with wrong body inputs', done => {
      request
      .post(`localhost:${PORT}/api/student`)
      .send({weasel: 'Dude', bald: 'Bro'})
      .end((err, response) => {
        expect(err).to.be.an('error');
        expect(response.status).to.equal(400);
        expect(response.body.id).to.equal(undefined);
        done();
      });
    });
  });

  describe('GET: /api/student', () => {
    it ('Should return a student', done => {
      request
      .get(`localhost:${PORT}/api/student?id=${student.id}`)
      .end((err, response) => {
        if (err) return done(err);
        response.body = JSON.parse(response.body);
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Steven');
        expect(response.body.age).to.equal('30');
        done();
      });
    });

    it('Should return 404 not found for a good request, but wrong ID', done => {
      request
      .get(`localhost:${PORT}/api/student?id=69`)
      .end((err, response) => {
        expect(err).to.be.an('error');
        expect(response.status).to.equal(404);
        expect(response.body.name).to.equal(undefined);
        done();
      });
    });

    it('Should return an array of all IDs if no ID is given', done => {
      request
      .get(`localhost:${PORT}/api/student`)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(1);
        done();
      });
    });
  });

  describe('DELETE: /api/student', () => {
    it ('Should return a status of 204 with no content body', done => {
      request
      .delete(`localhost:${PORT}/api/student?id=${student.id}`)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.status).to.equal(204);
        expect(response.body.name).to.equal(undefined);
        done();
      });
    });
  });
});
