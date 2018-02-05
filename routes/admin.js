var express = require('express');
var router = express.Router();
var Person = require('../models/person');
var Business = require('../models/business');
var info = require ('../utils/info');
var login  = require('../utils/utilFuncs');
/* GET users listing. */
router.get('/',login.isLoggedIn, function(req, res, next) {
  res.render("admin/index",{
                    title: 'Admin Home',
                 business: info.busInfo,
                     user: req.user,
                    pages: info.AdPages
  });
});

//View all personal customers
router.get('/people',login.isLoggedIn, function(req, res, next) {
var cus = null;
  Person.find({}).then(function(custo,err){
    if(custo){
      cus=custo;
    }else{
      console.log(err);
    }
    res.render("admin/people", {
         title: 'People',
      business:info.busInfo,
            th:["name","phone","email","address","city", "country"],
          user: req.user,
         data: cus,
          pages:info.AdPages
    });
  });
});

//GET all personal customers
router.get('/addPeople',login.isLoggedIn, function(req, res, next) {
    res.render("admin/addData", {
         title: 'People',
      business:info.busInfo,
          user: req.user,
          pages:info.AdPages
  });
});

//POST all personal customers
router.post('/addBusiness',login.isLoggedIn, function(req, res, next) {

  Business.findOne({ business: req.body.business},function(err,user){
    // console.log("Business :"+req.body);
        if(err){
          console.log(err);
        }
        else if (user != null){
          req.session.messages='User already exists in the system';
          console.log(user);
          res.redirect('/admin/business');
        }
        	else
        {// user do not exists in our db
          Business.create(new Business({
                           business: req.body.business,
                             person: req.body.person,
                              phone: req.body.phone,
                              email: req.body.email,
                           address : req.body.street_number+' '+req.body.street,
                              city : req.body.city,
                          province : req.body.province,
                            country: req.body.country,
                           // username: req.body.firstname
                          created  : Date.now(),
                        }),
          function(err, business){
            if (err) {
                  console.log(err);
                  res.redirect('/error'); }
            else{
              res.redirect('/admin/business');
             }
          }
        );
      }//elsif
    }//findone
  );
});
//View all corporate customers
router.get('/business',login.isLoggedIn, function(req, res, next) {
  Business.find({}).then(function(cus,err){
    console.log(cus);
    res.render("admin/people", {
         title: 'Business',
      business:info.busInfo,
            th:["business name","contact person","phone","email","address","city", "country"],
          user: req.user,
         data: cus,
          pages:info.AdPages
    });
  });
});
//GET Input form for businesses
router.get('/addBusiness',login.isLoggedIn, function(req, res, next) {
    res.render("admin/addData", {
         title: 'Business',
      business:info.busInfo,
            th:["name","phone","email"],
          user: req.user,
          pages:info.AdPages
  });
});
module.exports = router;
