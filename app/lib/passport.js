/**
 * External dependencies
 */
import passport from 'passport';
import passportLocal from 'passport-local';
import passportHttpBearer from 'passport-http-bearer';
import session from 'express-session';
import mongoose from 'mongoose';

const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportHttpBearer.Strategy;
const User = mongoose.model( 'User' );

export default ( app, config, logger ) => {
  app.use( session( { secret: config.session.secret } ) );
  app.use( passport.initialize() );
  app.use( passport.session() );

  passport.serializeUser( ( user, done ) => {
    logger.info( 'Serializing user %s.', user.id );
    done( null, user.id );
  } );

  passport.deserializeUser( ( id, done ) => {
    logger.info( 'Finding user %s.', id );

    User.findById( id, ( err, user ) => {
      if ( err ) {
        logger.error( 'Error while finding user: %s', err.message || err );
      } else if ( !user ) {
        logger.error( 'Could not find user %s.', id );
      } else {
        logger.info( 'User found with id %s.', id );
      }

      done( err, user );
    } );
  } );

  // Define the bearer strategy for logging in through a token
  passport.use( 'local-token', new BearerStrategy( ( token, done ) => {
      User.findOne( { token: token }, done );
  } ) );

  // Define the local strategy for logging in through an email and password
  passport.use( 'local-login', new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
  }, ( email, password, done ) => {
    // Find the user first before checking the password
    User.findOne( { email: email }, ( err, user ) => {
      if ( err ) {
        logger.error( 'Error while authenticating user: %s', err.message || err );
        return done();
      }

      if ( !user || !user.validPassword( password ) ) {
        logger.error( 'Invalid credentials supplied for user: %s', email );
        return done();
      }

      done( null, user );
    } );
  } ) );
};
