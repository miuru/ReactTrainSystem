const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const userRoutes = express.Router();
const TrainRoutes = express.Router();
const TicketRoutes = express.Router();
const DiscountRoutes = express.Router();
const BookingRoutes = express.Router();

let RegUser = require('./railway.models/registed.user.model');
let train = require('./railway.models/train.model');
let ticket = require('./railway.models/ticket.model');
let special = require('./railway.models/specialdiscount.model');
let BookingS = require('./railway.models/specialBooking');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/railwayDB', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});


userRoutes.route('/login').post(function (req, res) {

    RegUser.find(req.body, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    RegUser.findOneAndUpdate({_id: id}, req.body, {new: true}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/').get(function (req, res) {
    RegUser.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').delete(function (req, res) {
    let id = req.params.id;
    RegUser.findById(id, function (err, users) {
        res.json(users);
        users.remove();
    });
});

userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;                                 //id gets from here
    RegUser.findById(id, function (err, users) {
        res.json(users);
    });
});


userRoutes.route('/update/:id').post(function (req, res) {
    RegUser.findById(req.params.id, function (err, users) {
        if (!users)
            res.status(404).send("data is not found");
        else
            users.Name = req.body.Name;
        users.NIC = req.body.NIC;
        users.Phone = req.body.Phone;
        users.Email = req.body.Email;
        users.Password = req.body.Password;

        users.save().then(user => {
            res.json('User Updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


userRoutes.route('/add').post(function (req, res) {
    let user = new RegUser(req.body);
    user.Type = "Domestic";
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

TrainRoutes.route('/').get(function (req, res) {
    train.find(function (err, trains) {
        if (err) {
            console.log(err);
        } else {
            res.json(trains);
        }
    });
});

TrainRoutes.route('/add').post(function (req, res) {
    let trainIns = new train(req.body);
    trainIns.save()
        .then(train => {
            res.status(200).json(train);
        })
        .catch(err => {
            res.status(400).send('adding new train failed');
        });
});

TrainRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;                                 //id gets from here
    train.findById(id, function (err, trains) {
        res.json(trains);
    });
});

TrainRoutes.route('/:id').delete(function (req, res) {
    let id = req.params.id;
    train.findById(id, function (err, trains) {
        if (err) {
            console.log(err);
        } else {
            trains.remove();
            res.json(trains);
        }

    });
});

TrainRoutes.route('/update/seats/:id').post(function (req, res) {
    train.findById(req.params.id, function (err, trains) {
        if (!trains)
            res.status(404).send("data is not found");
        else {
            trains.Class1.Seats = req.body.Class1.Seats;
            trains.Class2.Seats = req.body.Class2.Seats;
            trains.Class3.Seats = req.body.Class3.Seats;

            trains.save().then(trains => {
                res.json('Train Updated!');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

TrainRoutes.route('/update/:id').post(function (req, res) {
    train.findById(req.params.id, function (err, trains) {
        if (!trains)
            res.status(404).send("data is not found");
        else
            trains.Name = req.body.Name;
        trains.Email = req.body.Email;
        trains.ArrStation = req.body.ArrStation;
        trains.DeptTime = req.body.DeptTime;
        trains.DeptStation = req.body.DeptStation;
        trains.Class1 = req.body.Class1;
        trains.Class2 = req.body.Class2;
        trains.Class3 = req.body.Class3;

        trains.save().then(trains => {
            res.json('Train Updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

TicketRoutes.route('/').get(function (req, res) {
    ticket.find(function (err, tickets) {
        if (err) {
            console.log(err);
        } else {
            res.json(tickets);
        }
    });
});
// TicketRoutes.route('/:id').get(function (req, res) {
//     let id = req.params.id;
//     console.log(id);
//
//     ticket.find({UserID: id}, function (err, tickets){
//         res.json(tickets);
//     });
// });
TicketRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;                                 //id gets from here
    ticket.findById(id, function (err, tickets) {
        res.json(tickets);
    });
});

TicketRoutes.route('/add').post(function (req, res) {
    let mail = req.body.UserEmail;
    let paymentType =  req.body.Payment;
    let paymentNumber = req.body.PaymentNumber;
    let total = req.body.Total;

    console.log("my mail"+mail+paymentNumber+paymentNumber+total);
    let TicketIns = new ticket(req.body);
    TicketIns.save()
        .then(ticket => {
            res.status(200).json(ticket);
        })
        .catch(err => {
            res.status(400).send('adding new ticket failed');
        });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'miurushalinda@gmail.com',
            pass: 'miuru@7124'
        }
    });

    const mailOptions = {
        from: 'miurushalinda@gmail.com',
        to: mail,
        subject: 'Your Train Ticket Info',
        text: 'You have successfully completed your payment of Rs. '+total+
            ''+              ''+
            ' . Thank You ! - Lanka Railways'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});



TicketRoutes.route('/:id').delete(function (req, res) {
    let id = req.params.id;
    ticket.findById(id, function (err, tickets) {
        if (err) {
            console.log(err);
        } else {
            tickets.remove();
            res.json(tickets);
        }
    });
});
DiscountRoutes.route('/').get(function (req, res) {
    special.find(function (err, specials) {
        if (err) {
            console.log(err);
        } else {
            res.json(specials);
        }
    });
});

DiscountRoutes.route('/add').post(function (req, res) {
    let DiscountIns = new special(req.body);
    DiscountIns.save()
        .then(ticket => {
            res.status(200).json(ticket);
        })
        .catch(err => {
            res.status(400).send('adding new discount failed');
        });
});

DiscountRoutes.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    special.findOneAndUpdate({_id: id}, req.body, {new: true}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
app.use('/users', userRoutes);
app.use('/bookings',BookingRoutes)
app.use('/trains', TrainRoutes);
app.use('/tickets', TicketRoutes);
app.use('/discounts', DiscountRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});