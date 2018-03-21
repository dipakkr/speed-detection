var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

router.get('/test',(req,res,next) => {
    res.send('API WORKING - OVERSPEEDING ROUTE');
});


router.post('/:car_number',(req,res,next) => {

    //DB CONNECTION
        MongoClient.connect('mongodb://127.0.0.1:27017/SpeedAnalyser',(err,client) =>{
        if(err){
            console.log('Unable to connect to database');
        }
        console.log('Succces DB connection');
    
        const db = client.db('SpeedAnalyser');
        db.collection(req.body.car_number).insertOne({
            car_number : req.body.car_number,
            speed : req.body.speed
        })
        .then(function(result){
            res.json({"code": 200 ,"message": "Data uploaded successfully"});
        });
});

});

module.exports = router;