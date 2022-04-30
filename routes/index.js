const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.user) {
        const username = req.user.username;
    }

    res.render('index')
})

module.exports = router;