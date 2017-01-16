
/**
 * External dependencies
 */
import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

/**
 * Internal dependencies
 */
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

export default class FormRegistration extends Component {
  onClickRegister() {
    UserActions.Register(
        this.refs.inputEmail.getValue(),
        this.refs.inputPassword.getValue()
    );
  }

  render() {
    return (
      <div className={ this.props.className }>
        <Card>
          <CardTitle
            title="Registration Form"
            subtitle="Register for a new user account" />

          <CardText>
            <TextField
              ref="inputEmail"
              hintText="Use your best email"
              fullWidth={ true } />

            <TextField
              ref="inputPassword"
              hintText="Your cleverest password"
              fullWidth={ true }
              type="password" />

            <div>
              <RaisedButton
                label="Register User"
                primary={ true }
                onClick={ () => this.onClickRegister() } />
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
};
