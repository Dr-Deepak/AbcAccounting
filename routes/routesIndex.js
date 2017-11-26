
const express = require('express');
const router = express.Router();

const index = require('./index');
const admin = require('./admin');
const users = require('./users');
// const services= require('./services');
// const teams   = require('./teams');
// const api     = require('./api');

router.use('/', index);
router.use('/admin', admin);
router.use('/users', users);
// router.use('/viewServices', services);
// router.use('/viewTeams', teams);
// router.use('/api', api);


module.exports = router;
