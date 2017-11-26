var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var CustomerSchema = new mongoose.Schema
({
   firstname: {type: String, required: 'firstname is required'},
    lastname: {type: String, required: 'lastname is required'},
       phone: {type: String, required: 'phone is required'},
        role: {type: String,  default: 'user' },
       email: {type: String},
     address: {type: String},
        city: {type: String},
    province: {type: String},
      postal: {type: String},
    username: {type: String},
    password: {type: String},
     oauthID: {type: String},
     created: {type: Date, default:Date.now}
});
CustomerSchema.plugin(plm);
module.exports = mongoose.model('Customers', CustomerSchema);
