/**
 * External dependencies
 */
import mongo from 'mongoose';
import validator from 'mongoose-validator';
import passwordHash from 'password-hash';
import crypto from 'crypto';

/**
 * Internal dependencies
 */
import schemaRecipe from './user/recipe';

const emailValidator = [
  validator( {
    validator: 'isEmail',
    passIfEmpty: false,
    message: 'Email should be valid',
  } ),
];

const passwordValidator = [
  validator( {
    validator: 'isLength',
    arguments: [ 6 ],
    message: 'Password should have a minimum length of {ARGS[0]}',
  } ),
];

const SchemaUser = new mongo.Schema( {
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },

  password: {
    type: String,
    required: true,
    validate: passwordValidator,
  },

  token: {
    type: String,
    unique: true,
    required: true,
  },

  recipes: [ schemaRecipe ]
} );

SchemaUser.methods.saltPassword = function() {
  if ( !passwordHash.isHashed( this.password ) ) {
    this.password = passwordHash.generate( this.password );
  }
};

SchemaUser.pre( 'save', function( next ) {
  this.saltPassword();
  next();
} );

/**
 * Returns a boolean after checking if the given password
 * equals the hashed password.
 *
 * @param {string} password - The password to validate
 * @return bool
 */
SchemaUser.methods.validPassword = function( password ) {
  return passwordHash.verify(password, this.password)
};

/**
 * Simple method of registering a user in the database.
 *
 * @param {object} properties - Should contain `email, password`
 * @param {fn} done - Callback, return `err, user`
 */
SchemaUser.statics.simpleRegister = ( properties, done ) => {
  crypto.randomBytes( 48, ( err, buf ) => {
    properties.token = buf.toString( 'hex' );

    new mongo.models.User( properties )
    .save( ( err, user ) => {
      if ( err ) return done( err );

      done( null, user );
    } );
  } );
};

// Set up the model
mongo.model( 'User', SchemaUser );

export default SchemaUser;
