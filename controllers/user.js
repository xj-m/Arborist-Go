let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();

router.get('/user', function (req, res) {
    console.log('GET user');
    res.render('user');
})
module.exports = router;