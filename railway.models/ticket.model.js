const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ticket = new Schema({
   UserName:{
       type:String
   },
    UserEmail:{
       type:String
    },
   UserID:{
       type: String
   },
    TrainID:{
      type: String
    },
    Total:{
      type: Number
    },
    Payment:{
      PaymentMethod:{
          type:String
      },
      PaymentNumber:{
          type:String
      }
    },
    Seats: {
        Class1: {
            type: Number
        },
        Class2: {
            type: Number
        },
        Class3: {
            type: Number
        },
        PaymentDate:{
            type:String
        }
    }
});
module.exports = mongoose.model('ticket', Ticket);