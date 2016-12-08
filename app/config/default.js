var fs = require('fs');
var path = require('path');
var _ = require('lodash');

// Determine the main app path
var rootPath = path.normalize(__dirname + '/../..');

// Default config if no override exists
var defaultConfig = {
  development: {
    server: {
      port: 3000,
    },
     logger: {
      colorize: true,
    },
    mongo: 'mongodb://localhost/recipe-app-js-development',
     session: {
      secret: 'iamnotsurethisisnotarealsecret',
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
      secret: 'iamnotsurethisisnotarealsecret',
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
      secret: 'iamnotsurethisisnotarealsecret',
        ttl: 3600,
        prefix: 'production_',
    },
  },
};

var config = defaultConfig;

try {
  var stats = fs.lstatSync(path.join(rootPath, 'app/config/local.js'));

  if (stats.isFile()) {
    var localConfig = require(path.join(rootPath, 'app/config/local'));

    // Merging the default with the local configuration
    _.defaultsDeep(localConfig, defaultConfig);

    config = localConfig;

    console.log('Local config found, and loaded.');
  }
} catch (err) {
  // Not do anything, as the local config just doesn't exist
  console.log('No local config found, using defaults.');
}

module.exports = config[process.env.NODE_ENV || 'development'];