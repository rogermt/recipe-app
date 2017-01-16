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

export default class FormLogin extends Component {
  onClickLogin() {
    UserActions.Login(
        this.refs.inputEmail.getValue(),
        this.refs.inputPassword.getValue()
    );
  }

  render() {
    return (
      <div className={ this.props.className }>
        <Card>
          <CardTitle
            title="Login Form"
            subtitle="Login with an existing user account."/>

          <CardText>
            <TextField
              ref="inputEmail"
              hintText="Your email"
              fullWidth={ true } />

            <TextField
              ref="inputPassword"
              hintText="Your password"
              fullWidth={ true }
              type="password" />

            <div>
              <RaisedButton
                label="Login User"
                primary={ true }
                onClick={ () => this.onClickLogin() } />
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
};
