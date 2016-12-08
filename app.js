var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./app/config/default');

//Add extra middleware
app.use(bodyParser.json());

app.use(express.static('public'))

// Initialize the Redis session storage
require('./app/lib/session')(app, config);

// Initialize the logger
var logger = require('./app/lib/logger')(config);

// Initialize the database connection
var db = require('./app/lib/database')(logger, config);

// Initialize all the schemas
require('./app/schemas/user')();

// Initialize the passport authentication after the models
// have been initialized
require('./app/lib/passport')(app, config, logger);

// All the controllers used, are defined below
require('./app/controllers/index')(app, config);
require('./app/controllers/api/user/login')(app);
require('./app/controllers/api/user/logout')(app);
require('./app/controllers/api/user/register')(app, logger);

app.listen(config.server.port, function listenCallback() {
  logger.info('Started the Express server successfully on port %s.', config.server.port);
});

module.exports = app;