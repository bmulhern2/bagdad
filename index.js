var express = require('express');
var http = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');


const uri = "mongodb+srv://bmulhern2:Bmole22%21%21@cluster0-eopst.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: String,
    description: String,
    price: Number

});
const house = mongoose.model('house', houseSchema);

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
});
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html');
})
app.post('/add', (req, res) => {
    house.create({
        address: req.body.address,
        description: req.body.description,
        price: req.body.price
    }, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
});
app.get('/api', (req, res) => {
    house.find({}, (err, houses) => {
        if (err) {
            console.log(err);
        } else {
            res.json(houses);
        }
    });
});
app.listen('2020', function() {
    console.log("Application started on Port 2020");
});