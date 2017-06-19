const express = require( 'express' );
const app = express(); // creates an instance of an express application
const chalk=require('chalk');

// my logger all requests
// app.use registers some function to run for each incoming request
app.use(function (request,response,next) {
    // console.log("response",response);
    console.log(request.baseUrl);
    console.log(request.body);
    console.log(request.hostname);
    console.log(request.ip);
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
    next(); //must include next in app.use
});

// routes to capture url
app.get('/',function (req,res) {
    res.send('Welcome to ROOT');
});

app.get('/news',function (req,res) {
    res.send('Welcome to NEWS');
});


// start server, put at bottom of page
app.listen(3000, function () {
    console.log('Ready! Listening on PORT 3000... ');
});