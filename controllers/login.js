let express = require('express');
let router = express.Router();
let firebase = require('firebase');
let db = firebase.firestore();


router.get('/login', function (req, res) {
    var user = firebase.auth().currentUser;
    if (user) {
        console.log('GET user login');
        res.render('user', {
            uid: user.uid
        });
    } else {
        console.log('GET login');
        res.render('login', {
            uid: ""
        });
    }
    res.render('login');
});
router.post('/post_log', function (req, res) {
    let email = req.body.userEmail;
    let psw = req.body.userPsw;
    firebase.auth().signInWithEmailAndPassword(email, psw).catch(function (error) {
        // Handle Errors here.
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
            console.log('user auth!')
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            res.render('user', {
                uid: user.uid,
                err: ""
            });

            // ...
        } else {
            console.log('logged in or error')
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // User is signed out.
            // ...
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