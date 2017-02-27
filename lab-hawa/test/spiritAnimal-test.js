'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Spirit Animal Routes', function() {
  var spiritAnimal = null;

  describe('POST: /api/spiritAnimal', function() {
    it('should return a spirit animal, and a name', function(done) {
      request.post('localhost:3000/api/spiritAnimal')
      .send({ name: 'Hawa', spiritAnimal: 'pink dragon', spiritAnimalName: 'Simba'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Hawa');
        expect(res.body.spiritAnimal).to.equal('pink dragon');
        expect(res.body.spiritAnimalName).to.equal('Simba');
        spiritAnimal = res.body;
        done();
      });
    });

    it('Should return a status of 400 and bad request with no body', done => {
      request
      .post('localhost:3000/api/spiritAnimal')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        expect(res.body.id).to.equal(undefined);
        done();
      });
    });

    it('Should return a status of 400 and bad request with wrong body inputs', done => {
      request
      .post('localhost:3000/api/spiritAnimal')
      .send({hello: 'World', world: 'Hello'})
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        expect(res.body.id).to.equal(undefined);
        done();
      });
    });
  });

  describe('GET: /api/spiritAnimal', function() {
    it('should return a spirit animal', function(done) {
      request.get(`localhost:3000/api/spiritAnimal?id=${spiritAnimal.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Hawa');
        expect(res.body.spiritAnimal).to.equal('pink dragon');
        expect(res.body.spiritAnimalName).to.equal('Simba');
        done();
      });
    });

    it('Should return 404 not found for a good request, but wrong ID', done => {
      request
      .get('localhost:3000/api/spiritAnimal?id=22')
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(404);
        expect(res.body.name).to.equal(undefined);
        done();
      });
    });
  });

  describe('DELETE: /api/spiritAnimal', function() {
    it('should return no content', function(done) {
      request.delete(`localhost:3000/api/spiritAnimal?id=${spiritAnimal.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body.title).to.equal(undefined);
        expect(res.body.skill).to.equal(undefined);
        done();
      });
    });
  });
});
