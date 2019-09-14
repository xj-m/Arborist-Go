let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();

router.get('/survey', function (req, res) {
    console.log('GET survey');
    res.render('survey');
});
module.exports = router;