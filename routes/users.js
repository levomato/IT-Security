const express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/all', db.getUsers)
router.get('/posts', db.getPosts)

module.exports = router