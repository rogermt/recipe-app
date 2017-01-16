/**
 * External dependencies
 */
import React, { Component } from 'react';
//import { createStore } from 'redux';

/**
 * Internal dependencies
 */
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';
import RegistrationForm from './Form/Registration.react';
import LoginForm from './Form/Login.react';
import RecipeList from './Recipe/List.react';

export default class App extends Component {
  componentDidMount() {
    UserStore.addChangeListener( () => this.onStoreChange() );
  }

  componentWillUnmount() {
    UserStore.removeChangeListener( () => this.onStoreChange() );
  }

  onStoreChange() {
    this.setState( { user: UserStore.get() } );
  }

  componentWillMount() {
    this.state = {
      user: UserStore.get(),
    };
  }

  onClickLogout() {
    UserActions.Logout();
  }

  render() {
    let body;

    if ( this.state.user ) {
      body = (
        <div className="row">
          <h1>You are logged in!</h1>

          <a href="javascript:void(0);" onClick={ this.onClickLogout }>
            Logout { this.state.user.email }
          </a>

          <RecipeList className="col-xs-12" />
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
  }
};
