var React = require('react');
var UserStore = require('../../stores/UserStore');
var UserActions = require('../../actions/UserActions');

var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardText = require('material-ui/lib/card/card-text');
var CardTitle = require('material-ui/lib/card/card-title');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');

module.exports = React.createClass({
  displayName: 'FormLogin',

  componentDidMount: function() {
    UserStore.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.onStoreChange);
  },

  onStoreChange: function() {
    console.log('Store has changed!', UserStore.get());
  },

  onClickLogin: function() {
    UserActions.Login(
        this.refs.inputEmail.getValue(),
        this.refs.inputPassword.getValue()
    );
  },

  render: function() {
    return (
      <div className={this.props.className}>
        <Card>
          <CardTitle
            title="Login Form"
            subtitle="Login with an existing user account."/>

          <CardText>
            <TextField
              ref="inputEmail"
              hintText="Your email"
              fullWidth={true} />

            <TextField
              ref="inputPassword"
              hintText="Your password"
              fullWidth={true}
              type="password" />

            <div>
              <RaisedButton
                label="Login User"
                primary={true}
                onClick={this.onClickLogin} />
            </div>
          </CardText>
        </Card>
      </div>
    );
  },
});
