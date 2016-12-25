var AppDispatcher = require('../dispatcher/AppDispatcher');
var RecipeUtils = require('../utils/RecipeUtils');
var RecipeConstants = require('../constants/RecipeConstants');
var ActionTypes = RecipeConstants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'recipe-change';

var RecipeStore = assign({}, EventEmitter.prototype, {
  get: function(index) {
    if (!sessionStorage.recipes) {
      return [];
    }

    var recipes = JSON.parse(sessionStorage.recipes);

    if (index && recipes[index]) return recipes[index];

    return recipes;
  },

  addChangeListener: function(done) {
    this.on(CHANGE_EVENT, done);
  },

  removeChangeListener: function(done) {
    this.removeListener(CHANGE_EVENT, done);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
});

RecipeStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.RECIPE_GETALL:
      RecipeUtils.RecipeIndex(action.token)
        .then(function(recipes) {
          sessionStorage.recipes = JSON.stringify(recipes);
          RecipeStore.emitChange();
        })

        .catch(function(err) {
          console.log(action.type, 'err', err);
          RecipeStore.emitChange();
        });
      break;

    default:
      break;
  }
});

module.exports = RecipeStore;
