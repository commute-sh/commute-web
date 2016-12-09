const express = require('express');
const debug = require('debug')('app:server');
const webpack = require('webpack');
const webpackConfig = require('../build/webpack.config');
const config = require('../config');
const compress = require('compression');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema');
const util = require('util');

const gravatar = require('gravatar');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const bodyParser = require('body-parser');

const AWS = require('aws-sdk');

/* eslint-disable */
window = {};
/* eslint-enable */

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  window.localStorage = new LocalStorage('./scratch');
}

require('isomorphic-fetch');
const colors = require('colors');

const session = require('express-session');

const AWS_ACCOUNT_ID = process.env['AWS_ACCOUNT_ID'];
const AWS_REGION = process.env['AWS_REGION'];
const COGNITO_USER_POOL_ID = process.env['COGNITO_USER_POOL_ID'];
const COGNITO_USER_POOL_CLIENT_ID = process.env['COGNITO_USER_POOL_CLIENT_ID'];
const COGNITO_IDENTITY_POOL_ID = process.env['COGNITO_IDENTITY_POOL_ID'];
const COGNITO_DATASET_NAME = process.env['COGNITO_DATASET_NAME'];
const PUBLIC_BASE_URL = process.env['PUBLIC_BASE_URL'];
const IAM_ROLE_ARN = process.env['IAM_ROLE_ARN'];

const FACEBOOK_APP_ID = process.env['FACEBOOK_APP_ID'];
const FACEBOOK_APP_SECRET = process.env['FACEBOOK_APP_SECRET'];

const GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
const GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'];

const TWITTER_CONSUMER_KEY = process.env['TWITTER_CONSUMER_KEY'];
const TWITTER_CONSUMER_SECRET = process.env['TWITTER_CONSUMER_SECRET'];

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${PUBLIC_BASE_URL}/auth/facebook/callback`,
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
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

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: `${PUBLIC_BASE_URL}/auth/twitter/callback`,
    includeEmail: true
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);
    console.log("Profile:", profile);
    done(null, profile);
  }
));

passport.use(new LocalStrategy({
    passReqToCallback: true,
    session: false
  }, function(req, username, password, done) {

  const authenticationDetails = createAuthenticationDetails(username, password);

  let cognitoUser = createCognitoUser(username);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (profile) {
      profile.accessToken = profile.getAccessToken();
      profile.refreshToken = profile.getRefreshToken();
      profile.id_token = profile.idToken;
      profile.provider = 'local';
      console.log("accessToken:", profile.accessToken);
      console.log("refreshToken:", profile.refreshToken);
      console.log("Profile:", profile);
      console.log('access token + ' + profile.getAccessToken().getJwtToken());
      /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
      console.log('idToken + ' + profile.id_token.jwtToken);

      cognitoUser.getUserAttributes(function(err, userAttributes) {
        if (err) {
          setTimeout(function() {
            done(err);
          }, 1000);
        } else {
          console.log('userAttributes:', userAttributes);

          const email = getUserAttribute(userAttributes, 'email');
          const givenName = getUserAttribute(userAttributes, 'given_name');
          const familyName = getUserAttribute(userAttributes, 'family_name');
          const displayName = `${givenName} ${familyName}`;
          const photo = gravatar.url(email, {protocol: 'https', s: '40'});

          const fullProfile = Object.assign(profile, {
            emails: [ { value: email } ],
            name: {
              givenName: givenName,
              familyName: familyName
            },
            displayName: displayName,
            photos: [ { value: photo } ]
          });

          setTimeout(function() {
            done(null, fullProfile);
          }, 1000);
        }
      });

    },
    onFailure: function (err) {
      setTimeout(function() {
        done(err);
      }, 1000);
    }
  });

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


app.get('/auth/google', passport.authenticate('google', { scope: [ 'openid', 'profile', 'email' ] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/error'
}));

/* GET Google success page. */
app.get('/auth/google/success', function (req, res, next) {
  console.log('[AUTH][GOOGLE][SUCCESS] User:', req.user);
  res.redirect('/');
});

/* GET Google error page. */
app.get('/auth/google/error', function (req, res, next) {
  res.send("Unable to access Google servers. Please check internet connection or try again later.");
});


/* GET Twitter page. */
app.get('/auth/twitter', passport.authenticate('twitter'));

/* GET Twitter callback page. */
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/auth/twitter/success',
  failureRedirect: '/auth/twitter/error'
}));

/* GET Twitter success page. */
app.get('/auth/twitter/success', function (req, res, next) {
  console.log('[AUTH][TWITTER][SUCCESS] User:', req.user);
  res.redirect('/');
});

/* GET Twitter error page. */
app.get('/auth/twitter/error', function (req, res, next) {
  res.send("Unable to access Twitter servers. Please check internet connection or try again later.");
});

app.post('/auth/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.post('/auth/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

app.post('/auth/sign-up', function(req, res, next) {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const givenName = req.body.givenName;
  const familyName = req.body.familyName;

  console.log('req.body:', req.body);

  const attributeList = [];

  attributeList.push(createCognitoUserAttribute('email', email));
  attributeList.push(createCognitoUserAttribute('given_name', givenName));
  attributeList.push(createCognitoUserAttribute('family_name', familyName));

  createUserPool().signUp(username, password, attributeList, null, function(err, result) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      const cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());

      res.status(201).json(cognitoUser);
    }
  });

});

app.post('/auth/sign-up/verify-code', function(req, res, next) {

  console.log('Body:', req.body);

  const username = req.body.username;
  const verificationCode = req.body.verificationCode;

  createCognitoUser(username).confirmRegistration(verificationCode, true, function(err, result) {
    if (err) {
      console.log('err:', err);
      res.status(500).json({ message: err.message });
    } else {
      console.log('callback result:', result);

      res.status(200).json(result);
    }
  });

});

app.get('/me', ensureAuthenticated, function (req, res) {

  const user = req.user;

  const me = createUser(user);

  console.log("Me:", me);

  res.json(me);
});

function createUser(user) {

  const email = user.emails && user.emails.length > 0 ? user.emails[0].value : undefined;

  const firstName = user.name && user.name.givenName ? user.name.givenName : "";
  const lastName = user.name && user.name.familyName ? user.name.familyName : "";

  const displayName = user.displayName ? user.displayName : `${firstName} ${lastName}`;

  const provider = user.provider;

  const photo = user.photos && user.photos.length > 0 ? user.photos[0].value : undefined;

  const roles = [];

  const me = {
    email: email,
    displayName: displayName,
    firstName: firstName,
    lastName: lastName,
    provider: provider,
    photo: photo,
    roles: roles
  };

  return me;
}

function createUserPool() {
  return new AWS.CognitoIdentityServiceProvider.CognitoUserPool({
    UserPoolId : COGNITO_USER_POOL_ID, // Your user pool id here
    ClientId : COGNITO_USER_POOL_CLIENT_ID, // Your client id here
  });
}

function createCognitoUser(username) {
  return new AWS.CognitoIdentityServiceProvider.CognitoUser({
    Username : username,
    Pool : createUserPool()
  })
}

function createAuthenticationDetails(username, password) {
  return new AWS.CognitoIdentityServiceProvider.AuthenticationDetails({
    Username : username,
    Password : password,
  });
}

function createCognitoUserAttribute(key, value) {
  return new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute({
    Name : key,
    Value : value
  })
}

function getUserAttribute(userAttributes, key) {

  const userAttribute = userAttributes.find(e => e.Name === key);

  console.log('userAttribute:', userAttribute);

  return userAttribute ? userAttribute.Value : undefined;
}


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
app.use(require('connect-history-api-fallback')());

// Apply gzip compression
app.use(compress());


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

module.exports = app;
