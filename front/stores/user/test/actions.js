/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';
import { expect, assert } from 'chai';
import nock from 'nock';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import { register, login } from '../actions';
import * as reducer from '../reducer';
import { USER_SET } from '../../action-types';

describe( 'actions', () => {
  describe( '#user', () => {
    describe( 'success', () => {
      let spy;

      before( () => {
        spy = sinon.spy( reducer, 'user' );

        nock( 'http://localhost' )
        .persist()
        .post( '/api/user/register', {
          email: 'test@example.com',
          password: 'password',
        } )
        .reply( 200 , {
          email: 'test@example.com',
          token: '123abc',
        } );

        nock( 'http://localhost' )
        .persist()
        .post( '/api/user/login', {
          email: 'test@example.com',
          password: 'password',
        } )
        .reply( 200 , {
          email: 'test@example.com',
          token: '123abc',
        } );
      } );

      after( () => {
        reducer.user.restore();
        nock.cleanAll();
      } );

      it( 'should log in a user', ( done ) => {
        spy.reset();

        login( 'test@example.com', 'password' )
        .then( () => {
          const state = spy.getCall( 0 ).args;
          const equal = [ null, { type: USER_SET,
            user: {
              email: 'test@example.com',
              token: '123abc',
            },
          } ];

          expect( spy.callCount ).to.equal( 1 );

          try {
            expect( state ).to.deep.equal( equal );
          } catch ( e ) {
            return done( e );
          }

          done();
        } );
      } );

      it( 'should register a user', ( done ) => {
        spy.reset();

        register( 'test@example.com', 'password' )
        .then( () => {
          const equal = [ null, { type: USER_SET,
            user: {
              email: 'test@example.com',
              token: '123abc',
            },
          } ];

          const state = spy.getCall( 0 ).args;

          expect( spy.callCount ).to.equal( 1 );

          try {
            expect( state ).to.deep.equal( equal );
          } catch ( e ) {
            return done( e );
          }

          done();
        } );
      } );
    } );

    describe( 'failure', () => {
      let spy;

      before( () => {
        spy = sinon.spy( reducer, 'user' );

        nock( 'http://localhost' )
        .persist()
        .post( '/api/user/register', {
          email: 'test@example.com',
          password: 'password',
        } )
        .reply( 500 );

        nock( 'http://localhost' )
        .persist()
        .post( '/api/user/login', {
          email: 'test@example.com',
          password: 'password',
        } )
        .reply( 401 );
      } );

      after( () => {
        reducer.user.restore();
        nock.cleanAll();
      } );

      it( 'should not log in a user', ( done ) => {
        spy.reset();

        login( 'test@example.com', 'password' )
        .catch( ( e ) => {
          expect( e.message ).to.equal( 'Unauthorized' );
          expect( spy.callCount ).to.equal( 0 );
          done();
        } );
      } );

      it( 'should register a user', ( done ) => {
        spy.reset();

        register( 'test@example.com', 'password' )
        .catch( ( e ) => {
          expect( e.message ).to.equal( 'Internal Server Error' );
          expect( spy.callCount ).to.equal( 0 );
          done();
        } );
      } );
    } );
  } );
} );
