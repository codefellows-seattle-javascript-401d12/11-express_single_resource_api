'use strict';

module.exports = function(request) {
  return new Promise ((resolve, reject) => {
    if (request.method === 'POST' || request.method === 'PUT') {
      var body = '';

      request.on('data', data => {
        body += data.toString();
      });

      request.on('end', () => {
        try {
          request.body = JSON.parse(body);
          resolve(request);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      request.on('error', (err) => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};
