import fs from 'fs';
import path from 'path';
import defaultsDeep from 'lodash/defaultsDeep';

// Determine the main app path
const rootPath = path.normalize( __dirname + '/../..' );

// Default config if no override exists
const defaultConfig = {
  development: {
    server: {
      port: 3000,
    },

    logger: {
      colorize: true,
    },

    mongo: 'mongodb://localhost/recipe-app-js-development',

    session: {
      secret: 'iamnotsureifthisisarealsecret',
      ttl: 3600 * 24,
      prefix: 'development_',
    },
  },

  test: {
    server: {
      port: 4000,
    },

    logger: {
      colorize: true,
    },

    mongo: 'mongodb://localhost/recipe-app-js-test',

    session: {
      secret: 'iamnotsureifthisisarealsecret',
      ttl: 3600 * 24,
      prefix: 'test_',
    },
  },

  production: {
    server: {
      port: 5000,
    },

    logger: {
      colorize: true,
    },

    mongo: 'mongodb://localhost/recipe-app-js-production',

    session: {
      secret: 'iamnotsureifthisisarealsecret',
      ttl: 3600,
      prefix: 'production_',
    },
  },
};

let config = defaultConfig;

try {
  const stats = fs.lstatSync( path.join( rootPath, 'app/config/local.js' ) );

  if ( stats.isFile() ) {
    const localConfig = require( path.join( rootPath, 'app/config/local' ) );

    // Merging the default with the local configuration
    defaultsDeep( localConfig, defaultConfig );

    config = localConfig;

    console.log( 'Local config found, and loaded.' );
  }
} catch ( err ) {
  // Not do anything, as the local config just doesn't exist
  console.log( 'No local config found, using defaults.' );
}

export default config[process.env.NODE_ENV || 'development'];
