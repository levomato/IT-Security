const express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../db');

passport.use(new LocalStrategy(function verify(username, password, cb) {
    const text = 'SELECT * FROM users WHERE name = $1 AND password = $2';
    const values = [username, password];
    db.query(text, values, function (err, result) {

        if (err) { return cb(err); }
        if (!result) { return cb(null, false, { message: 'Incorrect username or password.' }); }


        return cb(null, result.rows[0]);
    })



}));

passport.serializeUser(function (user, cb) {

    process.nextTick(function () {
        cb(null, { id: user.id, username: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


router.get('/login', (req, res) => {
    res.render('login')
})



router.post('/password',
    passport.authenticate('local', {

        failureRedirect: '/login',
        failWithError: true
    }), function (req, res) {
        const username = req.user.name;
        res.redirect('/blog',
        )
    }
)

router.get('/signup', function (req, res, next) {
    res.render('signup');
})

router.post('/signup', function (req, res, next) {

    db.query('INSERT INTO users (name, password) VALUES ($1, $2)', [req.body.name, req.body.password], (error, results) => {
        console.log(this);

        if (error) {
            throw error
        }

        db.query('SELECT * FROM users GROUP BY id HAVING id = MAX(id)', (error, results) => {
            if (error) {
                throw error
            }
            var user = {
                id: results.rows[0].id,
                name: req.body.name
            };
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.redirect('/blog');
            });
        })


    })

});

router.post('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router