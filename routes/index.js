const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

// root route loads tweetBank
router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets } );
});

// users route
router.get( '/users', function (req, res) {
    res.send("I'm in USERS");
});

// say that a client GET requests the path /users/nimit
router.get( '/users/:name', function (req, res) {
    console.log("req.params.name",req.params.name); // --> 'nimit'
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list } );
});

// tweets id route
router.get( '/tweets/:id', function (req, res) {
    console.log("req.params.name",req.params.name); // --> 'nimit'
    var tweetId = req.params.id;
    var list = tweetBank.find( {id: Number(tweetId)} );
    res.render( 'index', { tweets: list } );
});

router.get( '/store/:product/reviews/:id', function (req, res) {
    // use req.params here
    // store/microwave/reviews/197
    // product=microwave id=197
    console.log(req.params.product, req.params.id);
});

// __dirname +
// router.get('/stylesheets/style.css',function (req,res) {
//     res.sendFile('../public/stylesheets/style.css');
// });
// how do i input the path in here?


// does this goes here or in app.js
// router.use(express.static('public'));


module.exports = router;