let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();


router.get('/test', function (req, res) {
    console.log('GET index');
    res.render('test');
});



module.exports = router;