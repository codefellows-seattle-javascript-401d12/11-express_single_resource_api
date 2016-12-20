'use strict';

const parseUrl = require('./url-parser.js');
const parseJSON = require('./body-parser.js');
const respond = require('./respond.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (request, response) => {
    Promise.all([
      parseUrl(request),
      parseJSON(request)
    ])
    .then(() => {
      if (typeof this.routes[request.method][request.url.pathname] === 'function') {
        this.routes[request.method][request.url.pathname](request, response);
        return;
      }
      respond.sendText(response, 404, 'No such route exists.', 'No such route exists.');
    })
    .catch(err => {
      respond.sendText(response, 400, 'Bad request.', err);
    });
  };
};
