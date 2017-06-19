const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets } );
});

// __dirname +
// router.get('/stylesheets/style.css',function (req,res) {
//     res.sendFile('../public/stylesheets/style.css');
// });
// how do i input the path in here?


// does this goes here or in app.js
// router.use(express.static('public'));


module.exports = router;