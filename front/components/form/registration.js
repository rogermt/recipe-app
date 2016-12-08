var React = require('react');
var UserStore = require('../../stores/userStore');
var UserActions = require('../../actions/userActions');

var Registration = React.createClass({
  
  componentDidMount: function(){
    UserStore.addChangeListener(this.onStoreChange);
  },
  
  componentWillUnmount: function(){
    UserStore.removeChangeListener(this.onStoreChange);
  },
  
  onStoreChange: function(){
    console.log('Store has changed!', UserStore.get());
  },
  
  clickRegister: function(){
    UserActions.Register('test@example.com', 'somepassword');
  },

  render: function() {
    return (
      <div>
        <h2>Registration form</h2>
        <a href="javascript:void(0);" onClick={this.clickRegister}>Go</a>
      </div>
    );
  },
});

module.exports = Registration;