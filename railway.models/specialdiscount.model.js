const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Special = new Schema({
    Discount:{
        type:Number
    }
});
module.exports = mongoose.model('special', Special);