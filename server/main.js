const express = require('express');
const debug = require('debug')('app:server');
const webpack = require('webpack');
const webpackConfig = require('../build/webpack.config');
const config = require('../config');
const compress = require('compression');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema');
const util = require('util');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const AWS = require('aws-sdk');

require('isomorphic-fetch');
const colors = require('colors');

const session = require('express-session');

const AWS_ACCOUNT_ID = process.env['AWS_ACCOUNT_ID'];
const AWS_REGION = process.env['AWS_REGION'];
const COGNITO_IDENTITY_POOL_ID = process.env['COGNITO_IDENTITY_POOL_ID'];
const COGNITO_DATASET_NAME = process.env['COGNITO_DATASET_NAME'];
const PUBLIC_BASE_URL = process.env['PUBLIC_BASE_URL'];
const IAM_ROLE_ARN = process.env['IAM_ROLE_ARN'];

const FACEBOOK_APP_ID = process.env['FACEBOOK_APP_ID'];
const FACEBOOK_APP_SECRET = process.env['FACEBOOK_APP_SECRET'];

const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'];

const SESSION_SECRET = process.env['SESSION_SECRET'];

AWS.config.region = AWS_REGION;

const app = express();

var sess = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${PUBLIC_BASE_URL}/auth/facebook/callback`
}, function (accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  console.log("accessToken:", accessToken);
  console.log("refreshToken:", refreshToken);
  console.log("Profile:", profile);
  done(null, profile);
}));

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${PUBLIC_BASE_URL}/auth/google/callback`
  },
  function(accessToken, refreshToken, params, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    profile.id_token = params.id_token;
    console.log("params:", params);
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);
    console.log("id_token:", params.id_token);
    console.log("Profile:", profile);
    done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  console.log("Serializing user:", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("Deserializing user:", user);
  done(null, user);
});

/* GET Facebook page. */
app.get('/auth/facebook', passport.authenticate('facebook'));

/* GET Facebook callback page. */
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/auth/facebook/success',
  failureRedirect: '/auth/facebook/error'
}));

/* GET Facebook success page. */
app.get('/auth/facebook/success', function (req, res, next) {
  console.log('[AUTH][FACEBOOK][SUCCESS] User:', req.user);
  res.redirect('/');
});

/* GET Facebook error page. */
app.get('/auth/facebook/error', function (req, res, next) {
  res.send("Unable to access Facebook servers. Please check internet connection or try again later.");
});


app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'openid', 'profile', 'email'
  ]
}));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/error'
}));

/* GET Facebook success page. */
app.get('/auth/google/success', function (req, res, next) {
  console.log('[AUTH][GOOGLE][SUCCESS] User:', req.user);
  res.redirect('/');
});

/* GET Facebook error page. */
app.get('/auth/google/error', function (req, res, next) {
  res.send("Unable to access Google servers. Please check internet connection or try again later.");
});


app.get('/me', ensureAuthenticated, function (req, res) {
  const user = req.user;

  const email = user.emails && user.emails.length > 0 ? user.emails[0].value : undefined;

  const firstName = user.name && user.name.givenName ? user.name.givenName : "";
  const lastName = user.name && user.name.familyName ? user.name.familyName : "";

  const displayName = user.displayName ? user.displayName : `${firstName} ${lastName}`;

  const photo = user.photos && user.photos.length > 0 ? user.photos[0].value : undefined;

  const roles = [];

  const me = {
    email: email,
    displayName: displayName,
    firstName: firstName,
    lastName: lastName,
    photo: photo,
    roles: roles
  };

  console.log("Me:", me);

  res.json(me);
});

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({message: "Not authenticated"});
}

app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: {request: req},
  pretty: process.env.NODE_ENV !== 'production',
})));

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

// Apply gzip compression
app.use(compress())


const paths = config.utils_paths

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}


//
// Register API middleware
// -----------------------------------------------------------------------------

module.exports = app
