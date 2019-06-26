const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let Booking = new Schema ({

    BookingNumber : String ,
    BookingName : String

})
module.exports = mongoose.model('BoookingS',Booking);