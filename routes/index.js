var express = require('express');
var router = express.Router();

var busInfo = {
                name:"ABC Accounting",
                phone:"111-111-1111",
                address:"1 abc st, Maple ON L6Y 4A2",
                email:"cs@abcacounting.com",
                fb:"https://www.facebook.com/ABC-Accounting-Inc-847227538796048/",
                tw:"https://twitter.com/AccountingToday"
              };
var pages = ["home","about","clients","services"];
var Customer = require('../models/customers');
var passport = require('passport');
var multer  = require('multer');
var storage = multer.diskStorage({
                  destination: function (req, file, cb) { cb(null, './uploads/')},
                  filename: function (req, file, cb) {cb(null, file.originalname)}
                });
  //initialize an empty task lists
  var upload = multer({ storage: storage });

// var curUser="";

/**** GET Requests of all views  ***/
/* GET home page. */
router.get('/', function(req, res, next) {
          res.render("index", { title: 'Home',
          business:busInfo,
          user: req.user,
          pages:pages
    });
});

// Loads About Page
router.get('/about', function(req, res, next) {
  res.render("about", { title: 'about',
  business:busInfo,
  user: req.user,
  pages:pages
});
});
// Loads Clients Page
router.get('/clients', function(req, res, next) {
  res.render("clients", { title: 'clients',
  business:busInfo,
  user: req.user,
  pages:pages

});
});
// Loads profile Page
router.get('/profile',isLoggedIn, function(req, res, next) {
  // Customer.findOne()
      res.render("profile", {
                              title   : 'My Information',
                              business:busInfo,
                              fName   :req.user.firstname,
                              lName   :req.user.lastname,
                              phone   :req.user.phone,
                              email   :req.user.email,
                              user    :req.user,
                              pages   :pages
                            }
                );
});
// Loads services Page
router.get('/services', function(req, res, next) {
  res.render("services", {
                          title   :'services',
                          business:busInfo,
                          user    :req.user,
                          pages   :pages

});
});

// Loads Registeration form
router.get('/register', function(req, res, next) {
  var messages = req.session.messages || []; //flash.message;
  // clear the session messages
  req.session.messages = [];
  if (req.user){
    res.redirect('/');
  }
  else
  {
    res.render("register", {
    title   : 'Register',
    business:busInfo,
    message :messages,
    pages   :pages,
    user    :req.user,
    fName   :'',
    lName   :'',
    phone   :'',
    email   :''
  });
}
});

//loads the register page with prepopulated text fields
router.get('/profile/:id', function(req, res, next) {
 var id = req.params.id;
 Customer.findById(id,function(err, user){
   res.render("register", {
   title   : 'Edit Profile',
   business:busInfo,
   message :'',
   pages   :pages,
   user    :user,
   id      :user._id,
   fName   :user.firstname,
   lName   :user.lastname,
   phone   :user.phone,
   email   :user.email
   });
 });
});
// Loads services Page
router.get('/login', function(req, res, next) {
  var messages = req.session.messages || []; //flash.message;
  // clear the session messages
  req.session.messages = [];
  res.render("login", {
                        title   : 'Login',
                        business:busInfo,
                        message :messages,
                        pages   :pages,
                        user    :req.user
                      }
            );
});
/***Get /facebook-show fb login popup***/
router.get('/facebook',passport.authenticate('facebook'), function(req, res, next){});

// code for 3rd party logins
router.get('/facebook/callback',passport.authenticate('facebook', {
  failureRedirect:'/login',
  failureMessage:'Invalid Login'
}),  function(req, res,next){
  res.redirect('/');
});


/* GET logout */
router.get('/logout',isLoggedIn, function(req, res, next) {
  // log the user out and redirect
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

/* Error page*/
router.get('/error', function(req, res, next) {
  // log the user out and redirect
  res.render("error", { title:'Error'});
});

/****************************END OF GET METHODS ************************/

/******************** POST Requests of all views ***********************/
/* POST login */
router.post('/login',
passport.authenticate('local',
                              {
                                successRedirect: '/',
                                failureRedirect: '/login',
                                failureMessage: 'Invalid Login',
                                failureFlash: true
                              }
),
function(req, res, next) {
  res.redirect('/');
}
);


/* POST   register form submission - Processes input from register form neqw user */
router.post('/register', function(req, res, next) {
  //           // create a new account
            Customer.findOne(
              {username: req.body.username},
              function(err,user)
      {
                  if(err){
                    console.log(err);
                  }
                  else if (user != null){
                    req.session.messages='Already registered, please Login';
                    console.log(user);
                    res.redirect('/register');
                  }	else if(user== null)
                  {// user do not exists in our db
                    Customer.register(
                      new Customer({
                                    firstname: req.body.firstname,
                                    lastname : req.body.lastname,
                                    phone    : req.body.phone,
                                    email    : req.body.email,
                                    username : req.body.username,
                                    created  : Date.now()
                                  }),	req.body.password,
                    function(err, customer){
                      if (err) { res.redirect('/error'); }
                      else{ res.redirect('/login'); }
                    }
                  );
                }
              }
            );
  });

router.post('/profile/:id', function(req, res, next) {
  var id = req.params.id;
  var customer = new Customer({
    _id      :id,
    firstname: req.body.firstname,
    lastname : req.body.lastname,
    phone    : req.body.phone,
    email    : req.body.email
    });
  //try to update
    Customer.update({_id: id},customer,
    function(err) {
                    if(err){
                      console.log(err);
                      res.render('/error')
                    }
                    else {
                         res.redirect('/profile');
                    }
    });
});

router.post('/updateUser:_id',isLoggedIn, function(req, res, next) {
  // create a new account
  Customer.findOne({_id: req.body.id},
    function(err,user) {
                            if(err){
                              console.log(err);
                            }
                            else if (user != null){

                            user.save({
                                              firstname: req.body.firstname,
                                              lastname : req.body.lastname,
                                              phone    : req.body.phone,
                                              email    : req.body.email
                                      }),
                              function(err, customer){
                                if (err) { res.redirect('/error'); }
                                else{ res.redirect('/login'); }
                              }
                          }
                        }
                  );
});
// route handeler to for handling file upload
router.post('/file',function(req,res,next){
console.log(req.file);
upload.array('file');
res.redirect('/');
});


//function to check if user is logged in
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) {
    return next();
  }
  else{
    res.redirect('/login');
  }
}
module.exports = router;
