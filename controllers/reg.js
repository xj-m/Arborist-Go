let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();

router.get('/reg', function (req, res) {
    db.collection('user').doc('uid').get().then(function (doc) {
        const uid = doc.data().uid;
        if (uid) {
            res.redirect('/user');
        } else {
            res.render('reg');
        }
    })
});
router.post('/post_reg', function (req, res) {
    let email = req.body.userEmail;
    let psw = req.body.userPsw;
    firebase.auth().createUserWithEmailAndPassword(email, psw).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: " + errorCode + " \nError Message: " + errorMessage)
        res.render('login', {
            err: errorMessage
        });
    });
    console.log('POST reg');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('user reg')
        }
    })
});

module.exports = router;