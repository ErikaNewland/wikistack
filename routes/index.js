var express = require('express');
//var express = require('express-promise-router)
var router = express.Router();
var models = require('../models');
module.exports=router;

router.get('/', (req, res, next)=>{
    res.render('index')
})
