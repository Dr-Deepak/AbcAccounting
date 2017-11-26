var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var BusinessSchema = new mongoose.Schema
({
    businame:{type: String, required:'businame is required'},
      person:{type: String, required:'person is required'},
       phone:{type: String, required:'phone is required'},
         fax:{type: String},
       email:{type: String},
     address:{type: String},
        city:{type: String},
    province:{type: String},
    username:{type: String},
    password:{type: String},
     created:{type: Date, default:Date.now }
});
BusinessSchema.plugin(plm);
module.exports = mongoose.model('Business', BusinessSchema);
