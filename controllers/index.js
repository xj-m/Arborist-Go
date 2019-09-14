let express = require('express');
let router = express.Router();
let firebase = require("firebase");
let db = firebase.firestore();
let annColRef = db.collection('announcements');


class Announcement {
    constructor(posterName, postContent, id) {
        this.posterName = posterName;
        this.postContent = postContent;
        this.id = id;
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {

    console.log(req.connection.remoteAddress);
    getAnnouncements().then((announcements) => {
        res.render('index', {
            announcements: announcements
        });
    });
});


router.post('/', function (req, res) {
    res.redirect('/');
});

router.post('/submit_post', function (req, res) {
    const announcementJSON = {
        posterName: req.body.posterName,
        postContent: req.body.postContent
    }
    annColRef.add(announcementJSON).then(() => {
        res.send("success");
    }).catch((err) => {
        console.log('err when add ann')
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
});
router.post('/del_post', function (req, res) {
    annColRef.doc(req.body.id).delete().then(() => {
        res.send('success');
    }).catch((err) => {
        console.log('err when del post')
        res.status(500);
        res.statusMessage = err;
        res.send();
    });
})

async function getAnnouncements() {
    const snapshot = await annColRef.get();
    let announcements = Array.from(snapshot.docs.map(doc =>
        new Announcement(doc.data().postContent, doc.data().posterName, doc.id)));
    return announcements;
}
module.exports = router;