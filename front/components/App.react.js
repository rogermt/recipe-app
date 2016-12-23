var React = require('react');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var RegistrationForm = require('./Form/Registration.react');
var LoginForm = require('./Form/Login.react');

module.exports = React.createClass({
  displayName: 'App',

  componentDidMount: function() {
    UserStore.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.onStoreChange);
  },

  onStoreChange: function() {
    this.setState({user: UserStore.get()});
  },

  getInitialState: function() {
    return {
      user: UserStore.get(),
    };
  },

  onClickLogout: function() {
    UserActions.Logout();
  },

  render: function() {
    var body;

    if (this.state.user) {
      body = (
        <div>
          <h1>You are logged in!</h1>

          <a href="javascript:void(0);" onClick={this.onClickLogout}>
            Logout {this.state.user.email}
          </a>
        </div>
      );
    } else {
      body = (
        <div className="row">
          <RegistrationForm className="col-xs-12 col-sm-6" />
          <LoginForm className="col-xs-12 col-sm-6" />
        </div>
      );
    }

    return body;
  },
});
