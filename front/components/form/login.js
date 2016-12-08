var React = require('react');

var Login = React.createClass({
  send: function() {
    this.props.onUser({user: 'login'});
  },

  render: function() {
    return (
      <div>
        <h2>Login form</h2>
        <a href="javascript:void(0);" onClick={this.send}>Go</a>
      </div>
    );
  },
});

module.exports = Login;