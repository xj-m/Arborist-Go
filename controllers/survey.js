let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();

router.get('/survey', function (req, res) {
    db.collection('treeInfo').doc('info').get().then(function (doc) {
        const lat = doc.data().lat;
        const long = doc.data().long;
        const path = doc.data().path;
        res.render('survey', {
            lat: lat,
            long: long,
            path: path
        });
    })
});
module.exports = router;