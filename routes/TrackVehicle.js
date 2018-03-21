var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

router.get('/test',(req,res,next) => {
    res.send('API WORKING - Vehicle Tracker ROUTE');
});

router.get('/:car_number',(req,res,next) => {
   
    MongoClient.connect('mongodb://127.0.0.1:27017/SpeedAnalyser',(err,client) => {
        if(err){
            return res.json({"message" : "DB Connection error"});
        }
        const db = client.db('SpeedAnalyser');

        db.collection(req.params.car_number).find({}).toArray((err,result) => {
            if(result == null){
                res.json({
                    "code" : 404,
                    "message" : "Car Not found"
                });
            }else{
                res.json({"code" : 200, result});
            }
        });
    });
});

module.exports = router;