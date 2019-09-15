let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();
var fs = require('fs');

router.post('/upload_img', function (req, res) {
    const base64 = req.body.data.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(`Image/newImage.jpg`, base64, {
        encoding: 'base64'
    });
});

module.exports = router;