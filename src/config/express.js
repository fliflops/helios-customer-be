const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors');
const helmet     = require('helmet');
// const passport   = require('passport');
const cookieParser = require('cookie-parser');

const {logs}     = require('./vars');
// const strategies = require('./passport')
const v1         = require('../api/routes/v1');
const error      = require('../api/middlewares/error');
const credentials = require('../api/middlewares/credentials');
const corsOptions = require('./corsOptions')
 

/**
* Express instance
* @public
*/

const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));


// parse body params and attache them to req.body
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(credentials)

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// enable authentication
// app.use(passport.initialize());
// passport.use('jwt',strategies.jwt)

// mount api v1 routes
app.use('/v1', v1);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);


module.exports = app;
