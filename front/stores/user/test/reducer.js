/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { user } from '../reducer';
import {
  USER_SET,
  USER_UNSET
} from '../../action-types';

describe( 'reducer', () => {
  describe( '#user', () => {
    it( 'should default with null', () => {
      const state = user( undefined, {} );
      expect( state ).to.eql( null );
    } );

    it( 'should set a user', () => {
      const userObject = deepFreeze( { username: 'test', id: 1234 } );
      const state = user( undefined, { type: USER_SET, user: userObject } );

      expect( state ).to.eql( userObject );
    } );

    it( 'should unset a user', () => {
      const userObject = deepFreeze( { username: 'test', id: 1234 } );
      const state = user( userObject, { type: USER_UNSET } );

      expect( state ).to.eql( null );
    } );
  } );
} );
