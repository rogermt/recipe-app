var AppDispatcher = require('../dispatcher/AppDispatcher');
var RecipeConstants = require('../constants/RecipeConstants');
var UserStore = require('../stores/UserStore');
var ActionTypes = RecipeConstants.ActionTypes;

module.exports = {
  GetAll: function(){
    var user = UserStore.get();
    AppDispatcher.dispatch({
      type: ActionTypes.RECIPE_GETALL,
      token: user.token,
    });
  },
};
