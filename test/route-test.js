'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const url = 'localhost:3000/api/simple_resource';

require('../server.js');

describe('route test /api/simple_resource', function(){
 var simple_resource;
  describe('POST', function(){
    it('should return a valid simple_resource', function(done){
      request.post(`${url}`)
       .send({topic:'javascript', book:'you donot know js'})
       .end((err, res) => {
         if(err) return done(err);
         expect(res.status).to.equal(200);
         expect(res.body.topic).to.equal('javascript');
         expect(res.body.book).to.equal('you donot know js');
         simple_resource = res.body;
         done();
       });
    });
  });
  describe('GET', function(){
    it('should return a valid simple_resource', function(done){
      request.get(`${url}?id=${simple_resource.id}`)
       .end((err, res) => {
         if(err) return done(err);
         expect(res.status).to.equal(200);
         res.body = JSON.parse(res.body);
         expect(res.body.id).to.equal(`${simple_resource.id}`);
         expect(res.body.topic).to.equal('javascript');
         expect(res.body.book).to.equal('you donot know js');
         expect(res.body.instructor).to.equal(undefined);
         done();
       });
    });
  });
  describe('PUT', function(){
    it('should update a note of simple_resource', function(done){
      console.log(simple_resource);
      request.put(`${url}`)
       .send({id:`${simple_resource.id}`, topic:'javascript', book:'Node Beginner Book'})
       .end((err, res) => {
         if(err) return done(err);
         expect(res.status).to.equal(200);
         expect(res.body.id).to.equal(`${simple_resource.id}`);
         expect(res.body.topic).to.equal('javascript');
         expect(res.body.book).to.equal('Node Beginner Book');
         done();
       });
    });
  });
  describe('DELETE', function(){
    it('should delete a note of simple_resource', function(done){
      request.delete(`${url}?id=${simple_resource.id}`)
       .end((err, res) => {
         if(err) return done(err);
         expect(res.status).to.equal(200);
         expect(res.text).to.equal('"file deleted!"');
         done();
       });
    });
  });
});
