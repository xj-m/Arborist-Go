let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();
var user = firebase.auth().currentUser;

router.get('/login', function (req, res) {
    if (user) {
        console.log('GET user login');
        res.redirect('/user');
    } else {
        console.log('GET login');
        res.render('login');
    }
    res.render('login');
});

router.post('/post_log', function (req, res) {
    let email = req.body.userEmail;
    let psw = req.body.userPsw;
    firebase.auth().signInWithEmailAndPassword(email, psw).catch(function (error) {
        // Handle Errors here.
        db.collection('user').doc('uid').set({
            uid: ""
        })
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: " + errorCode + " \nError Message: " + errorMessage)
        // ...
        res.render('login', {
            err: errorMessage
        });
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection('user').doc('uid').set({
                uid: user.uid
            })
            console.log('user auth!')
            res.redirect('/user');
        } else {
            db.collection('user').doc('uid').set({
                uid: ""
            })
            console.log('logged in or error')
        }
    });
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
})

module.exports = router;