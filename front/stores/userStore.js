var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserUtils = require('../utils/UserUtils');
var UserConstants = require('../constants/UserConstants');
var ActionTypes = UserConstants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'user-change';

var UserStore = assign({}, EventEmitter.prototype, {
  get: function() {
    if (sessionStorage.user) {
      return JSON.parse(sessionStorage.user);
    }
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

UserStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.USER_CREATE:
      // Expect action.email, action.password
      // In the end, emit a change
      UserUtils.RegisterUser(action.email, action.password)
        .then(function(user) {
          sessionStorage.user = JSON.stringify(user);
          UserStore.emitChange();
        })

        .catch(function(err) {
          console.log(action.type, 'err', err);
          UserStore.emitChange();
        });
      break;

    case ActionTypes.USER_LOGIN:
      // Expect action.email, action.password
      // In the end, emit a change
      UserUtils.LoginUser(action.email, action.password)
        .then(function(user) {
          sessionStorage.user = JSON.stringify(user);
          UserStore.emitChange();
        })

        .catch(function(err) {
          console.log(action.type, 'err', err);
          UserStore.emitChange();
        });
      break;

    case ActionTypes.USER_LOGOUT:
      sessionStorage.clear();
      UserStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = UserStore;
