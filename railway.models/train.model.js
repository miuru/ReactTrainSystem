const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Train = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
   Phone:{
        type: String
   }
});

module.exports = mongoose.model('train', Train);