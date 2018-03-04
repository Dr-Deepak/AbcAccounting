var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var PersonSchema = new mongoose.Schema
({
   fullname: {type: String, required: 'name is required'},
    // lastname: {type: String, required: 'lastname is required'},
       phone: {type: String, required: 'phone is required'},
    position: {type: String,  default: 'user' },
       email: {type: String, required: 'phone is required'},
     address: {type: String},
        city: {type: String},
    province: {type: String},
     country: {type: String},
      postal: {type: String},
    username: {type: String},
    password: {type: String},
     oauthID: {type: String},
     created: {type: Date, default:Date.now},
      edited: {type: Date, default:Date.now},
    editedBy: {type: String}
});
PersonSchema.plugin(plm);
module.exports = mongoose.model('Person', PersonSchema);
