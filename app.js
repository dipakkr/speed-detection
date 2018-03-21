
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var port = 4000;

//Intialize app
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//DB connection
MongoClient.connect('mongodb://127.0.0.1:27017/SpeedAnalyser',(err,client) =>{
    if(err){
        console.log('Unable to connect to database');
    }
    console.log('Succces DB connection');
});

//Setting server to accept cross-origin browser request

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.get('/test',(req,res) =>{
    res.send("API WORKING");
});

app.use('/push_speed',require('./routes/Overspeed.js'));

app.listen(port);
console.log('Server started at port : '+port);