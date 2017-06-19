"use strict";
const express = require( 'express' );
const app = express(); // creates an instance of an express application
const chalk=require('chalk');
const nunjucks=require('nunjucks');
const routes = require('./routes');


// my logger all requests
// app.use registers some function to run for each incoming request
app.use(function (request,response,next) {
    // console.log("response",response);
    console.log(request.baseUrl);
    console.log(request.body);
    console.log(request.hostname);
    console.log(request.ip);
    console.log("REQ.PATH==>",request.path);
    console.log("ORIGURL==>",request.originalUrl);
    console.log("DIR==> ",request.path);
    console.log("URL==> ",request.url);
    console.log("PARAMS==> ",request.params);
    console.log("PROTOCOL==> ",request.protocol);
    console.log("QUERY==> ",request.query);
    console.log("ROUTE==>",request.route);
    console.log("METHOD==> ",request.method);
    console.log("STATUSCODE==> ",response.statusCode);

    console.log(chalk.magenta(request.method)," ",chalk.cyan(request.path)," ",response.statusCode);
    next();
});

// logger for only special
app.use('/special',function (req,res,next) {
    res.send("You've reached a special area");
    next(); //must include next in app.use or if it's your own custom coded middleware
});

// middleware for routes module
app.use('/', routes);

// routes all static files in public
// middleware goes in app.js file
app.use(express.static('public'));

// routes to capture url
// app.get('/',function (req,res) {
//     // res.send('Welcome to ROOT');
//     // place this in this app.get /
//     const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//     res.render( 'index', {title: 'Hall of Fame', people: people} );
// });
//
//
// app.get('/news',function (req,res) {
//     // res.send('Welcome to NEWS');
//     res.render('index',locals);
// });

// nunjucks templates
var locals={
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
nunjucks.configure('views');
nunjucks.render('index',locals,function (err,output) {
    console.log(output);
});

// app.use() app.set() middleware
// use nunjucks with the express app
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates








// start server, put at bottom of page
app.listen(3000, function () {
    console.log('Ready! Listening on PORT 3000... ');
});