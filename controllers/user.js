let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();
let treesColRef = db.collection('trees');

class Tree {
    constructor(treeLoc, status, name, date, pictures, id) {
        this.treeLoc = treeLoc;
        this.status = status;
        this.name = name;
        this.date = date;
        this.pictures = pictures;
        this.id = id;
    }
}


router.get('/user', function (req, res) {
    db.collection('user').doc('uid').get().then(function (doc) {
        const uid = doc.data().uid;
        if (uid) {
            db.collection('user').doc(uid).get().then(function (doc) {
                const uName = doc.data().name;
                getTreesData().then((trees) => {
                    res.render('user', {
                        uid: uid,
                        uName: uName,
                        trees: trees
                    })
                });
            })
        } else {
            res.render('login', {
                err: "please login first!"
            })
        }
    })
});

router.get('/get_profile', function (req, res) {
    db.collection('user').doc('uid').get().then(function (doc) {
        const uid = doc.data().uid;
        if (uid) {
            db.collection('user').doc(uid).get().then(function (doc) {
                const uName = doc.data().name;
                getTreesData().then((trees) => {
                    res.render('profile', {
                        uid: uid,
                        uName: uName,
                        trees: trees
                    })
                });
            })
        } else {
            res.render('login', {
                err: "please login first!"
            })
        }
    })

});

async function getTreesData() {
    const snapshot = await treesColRef.get();
    let trees = Array.from(snapshot.docs.map(doc =>
        new Tree(doc.data().treeLoc, doc.data().status, doc.data().name, doc.data().date, doc.data().pictures, doc.id)));
    return trees;
}
module.exports = router;