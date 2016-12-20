'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
const PORT = process.env.PORT || 3000;

describe('Recipe routes', function() {
  var recipe = null;

  describe('POST: /api/recipe with valid query strings', function() {
    it('should return a recipe', function(done) {
      request.post(`localhost:${PORT}/api/recipe`)
      .send({ name: 'test name', ingredients: 'test ingredients', category: 'test category'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.ingredients).to.equal('test ingredients');
        expect(res.body.category).to.equal('test category');
        recipe = res.body;
        done();
      });
    });
  });
  describe('POST: /api/recipe with invalid query strings', function() {
    it('should return a 400 error', function(done) {
      request.post(`localhost:${PORT}/api/recipe?`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET: /api/recipe?id=valid-id', function() {
    it('should return a recipe', function(done) {
      request.get(`localhost:${PORT}/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.ingredients).to.equal('test ingredients');
        expect(res.body.category).to.equal('test category');
        done();
      });
    });
  });
  describe('GET: /api/recipe?', function() {
    it('should respond with a 400', function(done) {
      request.get(`localhost:${PORT}/api/recipe?`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('DELETE: /api/recipe?id=valid-id', function() {
    it('should remove a recipe from the recipe box', function(done) {
      request.delete(`localhost:${PORT}/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        if(err) {
          expect(res.status).to.equal(400);
          return done();
        }
        expect(res.status).to.equal(204);
        return done();
      });
    });
  });
  describe('DELETE: /api/recipe?id=non-exestent id', function() {
    it('should return a 400', function(done) {
      request.delete(`localhost:${PORT}/api/recipe?id=00000000-0000-0000-0000-000000000000`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
