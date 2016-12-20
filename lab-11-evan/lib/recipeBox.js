'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('recipe:recipeBox');

// eslint-disable-next-line
const recipeBox = {};

module.exports = exports = {};

exports.createRecipe = function(schemaName, recipe) {
  debug('createRecipe');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!recipe) return Promise.reject(createError(400, 'expected recipe'));

  let json = JSON.stringify(recipe);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${recipe.id}.json`, json)
  .then( () => recipe)
  .catch( err => Promise.reject(createError(400, err.message)));
};

exports.getRecipe = function(schemaName, id) {
  debug('getRecipe');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    let recipe = JSON.parse(data.toString());
    return recipe;
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};
// WORKING ON GETTING ALL RECIPES BACK ----------------------------
// exports.getAllRecipes = function(schemaName, id) {
//   return new Promise((resolve, reject) => {
//     if(!schemaName) return reject(createError(400, 'expected a schema name'));
//     if(!id) return reject(createError(400, 'expected an id'));
//
//     var schema = recipeBox[schemaName];
//     if(!schema) return reject(createError('no schema found'));
//
//     var recipes = recipeBox;
//     console.log(recipes);
//
//     resolve(recipes);
//   });
// };
// WORKING ON GETTING ALL RECIPES BACK ----------------------------

exports.delete_Recipe = function(schemaName, id) {
  debug('delete_Recipe');


  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));
};
