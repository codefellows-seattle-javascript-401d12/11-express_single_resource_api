'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('recipe:recipe');
const recipeBox = require('../lib/recipeBox.js');

const Recipe = module.exports = function(name, ingredients, category) {
  if(!name) throw createError(400, 'expected a name');
  if(!ingredients) throw createError(400, 'expected ingredients');
  if(!category) throw createError(400, 'expected a category');

  this.id = uuid.v1();
  this.name = name;
  this.ingredients = ingredients;
  this.category = category;
};


Recipe.createRecipe = function(_recipe) {
  debug('createRecipe');

  try {
    let recipe = new Recipe(_recipe.name, _recipe.ingredients, _recipe.category);
    return recipeBox.createRecipe('recipe', recipe);
  }
  catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

Recipe.getRecipe = function(id) {
  debug('getRecipe');
  return recipeBox.getRecipe('recipe', id);
};

Recipe.deleteRecipe = function(id) {
  debug('deleteRecipe');
  return recipeBox.delete_Recipe('recipe', id);
};
