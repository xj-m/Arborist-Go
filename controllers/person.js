let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();
let treeColRef = db.collection('trees')


router.post('/person/add_tree', function (req, res) {
    console.log('add tree post!')
    const treeJSON = {
        treeLoc: req.body.treeLoc,
        status: req.body.status,
        name: req.body.name,
        date: req.body.date,
        pictures: req.body.pictures
    }
    treeColRef.add(treeJSON).then(() => {
        res.send('success')
    })
});
module.exports = router;