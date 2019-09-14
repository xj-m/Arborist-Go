let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();


router.get('/', function (req, res) {
    console.log('GET index');
    res.render('index');
});

module.exports = router;