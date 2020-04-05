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
    }, function() {
        res.redirect('/'); 
    })});
app.get('/add', (req, res) => {
    res.redirect('/'); 
});
app.get('/api', (req, res) => {
    house.find({}, function(err, result) {
        if(!err) {
            res.json(result);
        } else {
            console.log(err);
        }
})});
app.listen('2020', function() {
    console.log("Application started on Port 2020");
});
