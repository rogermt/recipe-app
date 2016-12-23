var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');
var ActionTypes = UserConstants.ActionTypes;

module.exports = {
  // Registers a user through emitting a create user event
  Register: function (email, password) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_CREATE,
      email: email,
      password: password,
    });
  },

  Login: function (email, password) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
      email: email,
      password: password,
    });
  },

  Logout: function () {
    AppDispatcher.dispatch({type: ActionTypes.USER_LOGOUT});
  },
};
