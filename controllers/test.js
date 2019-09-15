let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();
const multer = require('multer');
var geoip = require('geoip-lite');

const upload = multer({
    dest: __dirname + '/images'
});

router.get('/test', function (req, res) {
    console.log('GET index');
    res.render('test');
});
router.get('/test2', function (req, res) {
    console.log('GET test2');
    res.render('test2');
});
router.post('/test2_post', (req, res) => {
    // if (isTree(req.body.url)) {
    if (isTree('/Users/xiangjun/Desktop/Hophacks-test/public/Image/test.png')) {
        res.redirect('/test2');
    } else {
        res.redirect('/index')
    }
});
router.get('/test3', function (req, res) {
    res.render('test3');
});


router.post('/upload', upload.single('photo'), (req, res) => {
    // var ip = req.connection.remoteAddress;
    var ip = '207.97.227.239';
    var geo = geoip.lookup(ip);
    // console.log(geo);
    // if (req.file) {
    db.collection('treeInfo').doc('info').set({
        lat: geo.ll[0],
        long: geo.ll[1],
        path: ""
        // path: req.file.destination + req.file.filename
    });
    // res.json(req.file);
    res.redirect('/survey'); //res.redirect(301,'/survey');
    // } else throw 'error';

});

function isTree(pic) {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    async function main() {
        const [result] = await client.labelDetection(pic); //change this
        const labels = result.labelAnnotations;

        var tree = false;
        for (label of labels) {
            if (label.description == 'Tree' && label.score > 0.8) tree = true;
        }
        console.log(tree);
    }
    main().catch(err => {
        console.error('ERROR:', err);
    });
}

module.exports = router;