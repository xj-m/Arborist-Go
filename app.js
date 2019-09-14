let express = require('express');
let firebase = require('firebase');
let path = require('path');
let cookieParser = require('cookie-parser');

// firebase
var firebaseConfig = {
    apiKey: "AIzaSyCwMpSpHHrjLaiAHR0mgB6uZcjeccuW6Jg",
    authDomain: "hophacks-68e28.firebaseapp.com",
    databaseURL: "https://hophacks-68e28.firebaseio.com",
    projectId: "hophacks-68e28",
    storageBucket: "hophacks-68e28.appspot.com",
    messagingSenderId: "349264057221",
    appId: "1:349264057221:web:433a09049ce52578b0aaec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let indexRouter = require('./controllers/index');
let userRouter = require('./controllers/user');
let loginRouter = require('./controllers/login');
let surveyRouter = require('./controllers/survey');
let testRouter = require('./controllers/test');
// const errorController = require('./controllers/error');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', surveyRouter);
app.use('/', testRouter);
// error handler
// app.use(errorController.get404);

// Setting up port
const port = process.env.PORT || 1109;

app.listen(port, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
});
module.exports = app;