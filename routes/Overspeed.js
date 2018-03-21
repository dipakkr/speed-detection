var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');
var timestamp = require('time-stamp');
var request = require('request');

router.get('/test',(req,res,next) => {
    res.send('API WORKING - OVERSPEEDING ROUTE');
});


router.post('/:car_number',(req,res,next) => {

    //DB CONNECTION
        MongoClient.connect('mongodb://dipakkr:123456789@ds012538.mlab.com:12538/speedx',(err,client) =>{

        if(err) console.log('Unable to connect to database');

        const db = client.db('speedx');

        //Update speed_limit using the google road api, also update the overspeed

        db.collection(req.params.car_number).insertOne({
            location : "Delhi, India",
            latitude : "28.7040592",
            longitude : "77.10249019999992",
            timestamp : timestamp('YYYY/MM/DD:mm:ss'),
            car_number : req.body.car_number,
            speed : req.body.speed,
            speed_limit : "65" + "KMPH",
            overspeed : req.body.speed - 65
        })
        
        .then(function(result){
            res.json({"code": 200 ,"message": "Data uploaded successfully"});
        });
    });
});

module.exports = router;