'use strict';

module.exports = exports = {};

exports.sendJSON = function(response, status, data) {
  response.writeHead(status, {'Content-Type': 'application/json'});
  if (data) {
    response.end(JSON.stringify(data));
    return;
  }
  response.end();
};

exports.sendText = function(response, status, errorMessage, error) {
  if (error) console.error(error);
  response.writeHead(status, {'Content-Type': 'text/plain'});
  response.end('Student not found.');
};
