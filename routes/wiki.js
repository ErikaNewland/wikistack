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
    console.log(req.body);
    var input = req.body;
    var title = input.title;
    var content = input.content;
    var page = Page.build({
        title: title,
        content: content
    });
    // let user=User.build({
    //     name:
    // })

//use find or create to pull in the user data

    page.save()
        .then((newPage)=>{
            res.json(newPage);
        })
        .catch(console.log);
    //res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next){
    res.render('addpage');
});

wikiRouter.get('/:customPage', (req, res, next)=> {
    let ourPage=req.params.customPage;
    console.log(ourPage);
    Page.findOne({
        where: {
            urlTitle: ourPage
        }
    })
        .then((ourPage)=>{
            //res.json(ourPage)
            res.render('wikipage', {title: ourPage.title, urlTitle: ourPage.urlTitle, pageContent: ourPage.content })
        
        })
        .catch(next)
     });


module.exports=wikiRouter;
