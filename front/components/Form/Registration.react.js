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
  displayName: 'FormRegistration',

  componentDidMount: function() {
    UserStore.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.onStoreChange);
  },

  onStoreChange: function() {
    console.log('Store has changed!', UserStore.get());
  },

  onClickRegister: function() {
    UserActions.Register(
        this.refs.inputEmail.getValue(),
        this.refs.inputPassword.getValue()
    );
  },

  render: function() {
    return (
      <div className={this.props.className}>
        <Card>
          <CardTitle
            title="Registration Form"
            subtitle="Register for a new user account" />

          <CardText>
            <TextField
              ref="inputEmail"
              hintText="Use your best email"
              fullWidth={true} />

            <TextField
              ref="inputPassword"
              hintText="Your cleverest password"
              fullWidth={true}
              type="password" />

            <div>
              <RaisedButton
                label="Register User"
                primary={true}
                onClick={this.onClickRegister} />
            </div>
          </CardText>
        </Card>
      </div>
    );
  },
});
