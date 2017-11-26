var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var routes          = require('./routes/routesIndex');
var mongoose        = require('mongoose');
var Customer        = require('./models/customers');
var config          = require('./config/globalVars');
var session         = require('express-session');
var passport        = require('passport');
var localStrategy   = require('passport-local').Strategy;
var facebookStrategy= require('passport-facebook');
var flash           = require('connect-flash');
var helmet          =require('helmet');
var app = express();

mongoose.connect(config.db);
app.use(flash());
app.use(helmet());
// enable sessions
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
passport.use(Customer.createStrategy());
// passport.use(Customer.createStrategy());
// read and write the user to / from the session
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

//configure facebook authuntication
passport.use(
  new facebookStrategy(
    {  clientID : config.ids.facebook.clientID,
    clientSecret: config.ids.facebook.clientSecret,
     callbackURL: config.ids.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, cb)
    {
      Customer.findOne({oathId: profile.id },function(err,user)
        {
          if(err){
            console.log(err);
          }
          else
          {
              if( user !== null){// fb user exists in our db
                console.log(user);
                 cb(null, user);
              }
              else
              {// create a new user
                  user = new Customer({
                                        oathId  : profile.id,
                                        username: profile.displayName,
                                         created: Date.now()
                                     });
                    user.save(
                      function(err) {
                            if(err){
                              console.log(err);
                            }
                            else{
                              cb(null, user);
                            }
                      });
              }
          }
      });
    }
));
module.exports = app;
