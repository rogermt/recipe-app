var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var ActionTypes = UserConstants.ActionTypes;

module.exports = {
  //Register a user through emitting a create user event
  Register: function (email, password){
    AppDispatcher.dispatch ({
      type: ActionTypes.USER_CREATE,
      email: email,
      password: password,
    });
  }
}