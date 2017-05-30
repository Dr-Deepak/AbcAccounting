var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var CustomerSchema = new mongoose.Schema
({
   firstname: {type: String, required: 'firstname is required'},
    lastname: {type: String, required: 'lastname is required'},
       phone: {type: String, required: 'phone is required'},
       email: {type: String},
    username: {type: String,},
    password: {type: String},
     oauthID: {type:String},
     created: {type:Date}
});
CustomerSchema.plugin(plm);
module.exports = mongoose.model('Customers', CustomerSchema);
