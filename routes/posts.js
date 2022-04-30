const express = require('express');
var router = express.Router();
const db = require('../db');

const connectEnsureLogin = require('connect-ensure-login');// authorization
const { getPosts } = require('../db');
const { user } = require('pg/lib/defaults');
const { response } = require('express');
router.get('/new', connectEnsureLogin.ensureLoggedIn(), function (req, res) {

    const post = {
        title: req.query.post,
    }
    res.render('post', { username: req.user.username, post: post })
})

router.post('/create', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    console.log(req);

    const post = {
        title: req.body.title,
        content: req.body.content,
        user: req.user.id
    }

    db.query('INSERT INTO posts (title, content, userid) VALUES ($1,$2,$3)', [post.title, post.content, post.user], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('/blog');
    })
})


module.exports = router;