'use strict';

const Student = require('../model/student-constructor.js');
const storage = require('../lib/storage.js');
const respond = require('../lib/respond.js');

module.exports = function(router) {
  router.get('/api/student', (request, response) => {
    if (request.url.query.id) {
      storage.getItem('student', request.url.query.id)
      .then(student => {
        respond.sendJSON(response, 200, student);
      })
      .catch(err => {
        respond.sendText(response, 404, 'Student not found.', err);
      });
      return;
    }
    storage.getAllItems('student')
    .then(allIds => {
      respond.sendJSON(response, 200, allIds);
    });
  });

  router.post('/api/student', (request, response) => {
    var student = new Student(request.body);
    storage.createItem('student', student)
    .then(student => {
      respond.sendJSON(response, 200, student);
    })
    .catch(err => {
      respond.sendText(response, 400, 'Bad request.', err);
    });
  });

  router.delete('/api/student', (request, response) => {
    if (request.url.query.id) {
      storage.deleteItem('student', request.url.query.id)
      .then(() => {
        respond.sendJSON(response, 204);
      })
      .catch(err => {
        respond.sendText(response, 404, 'Student not found.', err);
      });
      return;
    }
  });
};
