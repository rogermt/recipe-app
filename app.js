/**
 * External dependencies
 */
import express from 'express';
import bodyParser from 'body-parser';

/**
 * Internal dependencies
 */
import config from './app/config/default';
import session from './app/lib/session';
import logger from './app/lib/logger';
import db from './app/lib/database';
import { SchemaUser } from './app/schemas/user';
import passport from './app/lib/passport';

// Controllers
import controllerIndex from './app/controllers/index';
import controllerApiUserLogin from './app/controllers/api/user/login';
import controllerApiUserLogout from './app/controllers/api/user/logout';
import controllerApiUserRegister from './app/controllers/api/user/register';
import controllerApiRecipeIndex from './app/controllers/api/recipe/index';

const app = express();

// Extra middleware
app.use( bodyParser.json() );

// Static file server by Express
app.use( express.static( 'public' ) );

// Initialize the Redis session storage
session( app, config );

// Initialize the logger
const loggerInstance = logger( config );

// Initialize the database connection
db( loggerInstance, config );

// Initialize the passport authentication after the models
// have been initialized
passport( app, config, loggerInstance );

// All the controllers used, are defined below
controllerIndex( app, config );
controllerApiUserLogin( app );
controllerApiUserLogout( app );
controllerApiUserRegister( app, loggerInstance );
controllerApiRecipeIndex( app );

app.listen( config.server.port, () => loggerInstance.info( 'Started the Express server successfully on port %s.', config.server.port ) );

export default app;
