var express = require('express');
var router = express.Router();
var Customer = require('../models/customers');
var Business = require('../models/business');
var info = require ('../utils/info');
var login  = require('../utils/utilFuncs');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("admin/index",{
                    title: 'Admin Home',
                 business: info.busInfo,
                     user: req.user,
                    pages: info.AdPages
  });
});
//View all personal customers
router.get('/personal', function(req, res, next) {
var cus = null;
  Customer.find({}).then(function(custo,err){
    if(custo){
      cus=custo;
    }else{
      console.log(err);
    }
    res.render("admin/customers", {
         title: 'People',
      business:info.busInfo,
            th:["name","phone","email"],
          user: req.user,
         data: cus,
          pages:info.AdPages
    });
  });
});
//GET all personal customers
router.get('/addPeople', function(req, res, next) {
    res.render("admin/addPeople", {
         title: 'AddPeople',
      business:info.busInfo,
            th:["name","phone","email"],
          user: req.user,
          pages:info.AdPages
  });
});
//POST all personal customers
router.post('/addPeople', function(req, res, next) {
  console.log("POST OBJECT:"+JSON.stringify(req));

    res.redirect("/admin/personal");
});
//View all corporate customers
router.get('/corporations',login.isLoggedIn, function(req, res, next) {
  Business.find({}).then(function(cus,err){
    res.render("admin/customers", {
         title: 'Corporations',
      business:info.busInfo,
            th:["company","contact","phone","email",],
          user: req.user,
         data: cus,
          pages:info.AdPages
    });
  });
});

module.exports = router;
