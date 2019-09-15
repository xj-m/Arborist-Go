let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();
var user = firebase.auth().currentUser;
let treesColRef = db.collection('trees');

class Tree {
    // firstly for only one pic
    constructor(treeLoc, status, name, date, pictures) {
        this.treeLoc = this.treeLoc;
        this.status = this.status;
        this.name = this.name;
        this.date = this.date;
        this.pictures = this.pictures;
    }
}


router.get('/user', function (req, res) {

    db.collection('user').doc('uid').get().then(function (doc) {
        const uid = doc.data().uid;
        if (uid) {
            getTreesData().then((trees) => {
                res.render('user', {
                    uid: uid,
                    trees: trees
                })
            });
        } else {
            res.render('login', {
                err: "please login first!"
            })
        }
    })

})
async function getTreesData() {
    const snapshot = await treesColRef.get()
    return snapshot.docs.map(doc => doc.data());
}
module.exports = router;