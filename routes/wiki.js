var express = require('express');
//var express = require('express-promise-router)
var wikiRouter = express.Router();
var models = require('../models');
const Page = models.Page;
const User = models.User;

wikiRouter.get('/', function(req, res, next){
    //res.send('get /wiki/')
    console.log('caught');
    res.redirect('/');
});

wikiRouter.post('/', function(req, res, next){
    var input = req.body;
    var title = input.title;
    var content = input.content;
    var page = Page.build({
        title: title,
        content: content
    });

    page.save();
    res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next){
    res.render('addpage');
});

module.exports=wikiRouter;
