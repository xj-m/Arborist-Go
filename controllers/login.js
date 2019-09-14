let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();

router.get('/login', function (req, res) {
    console.log('GET login');
    res.render('login');
})
module.exports = router;