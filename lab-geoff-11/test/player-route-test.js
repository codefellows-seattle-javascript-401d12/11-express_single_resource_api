'use route';

const request = require('superagent');
const expect  = require('chai').expect;

require('../server.js');

const PORT = process.env.PORT || 5555;

describe('Player Routes', function() {
  var player = null;

  describe('POST: /api/player', function() {
    it('should return a player', function(done) {
      let name = 'Geoff Simons';
      let email = 'geoff@example.com';
      request.post(`localhost:${PORT}/api/player`)
      .send({ name: name, email: email})
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.deep.equal(name);
        expect(res.body.email).to.equal(email);
        expect(res.body.id).to.be.ok; //TODO: More specific?
        player = res.body;
        done();
      });
    });

    it('should 400 with non-conforming body', function(done) {
      request.post(`localhost:${PORT}/api/player`)
      .send({ name: 'Me'})
      .end( (err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/player', function() {
    it('should return a player', function(done) {
      request.get(`localhost:${PORT}/api/player?id=${player.id}`)
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(player);
        done();
      });
    });

    it('should 404 on unknown player', function(done) {
      request.get(`localhost:${PORT}/api/player?id=not-a-real-id`)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should 400 on missing id', function(done) {
      request.get(`localhost:${PORT}/api/player`)
      .end( (err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /a/bogus/route', function() {
    it('should 404 not found', function(done) {
      request.get(`localhost:${PORT}/a/bogus/route`)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE: /api/player', function() {
    it('should delete a player', function(done) {
      request.delete(`localhost:${PORT}/api/player?id=${player.id}`)
      .end( (err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);

        request.get(`localhost:${PORT}/api/player?id=${player.id}`)
        .end( (err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

});
