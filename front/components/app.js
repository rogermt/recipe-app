var React = require("react");

var RegistrationForm = require('./form/registration');
var LoginForm = require('./form/login');

var App = React.createClass({
  handleLogout: function() {
    console.log('Log out clicked.');
    this.setState({user: null});
  },

  getInitialState: function() {
    return {
      user: null,
    };
  },

  onUser: function(user) {
    console.log('Got a user', user);
    this.setState({user: user});
  },
  
  render: function(){
        var menu;
    var body;

    if (this.state.user) {
      menu = (
        <a href="javascript:void(0);" onClick={this.handleLogout}>Logout</a>
      );

      body = (
        <h1>You are logged in!</h1>
      );
    } else {
      body = (
        <div>
          <RegistrationForm onUser={this.onUser} />
          <LoginForm onUser={this.onUser} />
        </div>
      );
    }

    return (
      <div>
        <div>{menu}</div>
        {body}
      </div>
    );
  },
            
            
});

module.exports = App;