const express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');// authorization
const db = require('../db');
router.get('/', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
    const username = req.user.username;
    let posts;
    db.query('SELECT * FROM posts', (err, results) => {
        posts = results.rows;

        res.render('blog', { username: req.user.username, posts: posts })
    })



})

module.exports = router;