var express = require('express');
//var express = require('express-promise-router)
var router = express.Router();
var models = require('../models');
var wikiRouter = require('./wiki');
var userRouter = require('./user');
module.exports=router;

router.use('/wiki', wikiRouter);

router.get('/', (req, res, next)=>{
    res.render('index')
})
