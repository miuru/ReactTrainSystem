const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegisteredUser = new Schema({
    Type: {
        type:String
    },
    Name: {
        type: String
    },
    NIC: {
        type: String
    },
    Phone: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    Govt: {
      type:String
    }
});

module.exports = mongoose.model('RegUser', RegisteredUser);