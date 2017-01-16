/**
 * External dependencies
 */
import request from 'superagent';

/**
 * Internal dependencies
 */
import { user } from './reducer';
import { USER_SET } from '../action-types';

export function login( email, password ) {
  return new Promise( ( resolve, reject) => {
    request
    .post( 'http://localhost/api/user/login' )
    .send( { email: email, password: password } )
    .end( ( err, res ) => {
      if ( err ) {
        return reject( err );
      }

      user( null, { type: USER_SET, user: res.body } );
      resolve();
    } );
  } );
}

export function register( email, password ) {
  return new Promise( ( resolve, reject) => {
    request
    .post( 'http://localhost/api/user/register' )
    .send( { email: email, password: password } )
    .end( ( err, res ) => {
      if ( err ) {
        return reject( err );
      }

      user( null, { type: USER_SET, user: res.body } );
      resolve();
    } );
  } );
}
