var express = require('express');
var router = express.Router();


router.get('/test',(req,res,next) => {
    res.send('API WORKING - OVERSPEEDING ROUTE');
});

module.exports = router;