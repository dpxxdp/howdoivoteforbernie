'use strict';
var fs = require('fs'),
    json;

var express = require('express');
var router = express.Router();
var vote = require('../public/data/vote.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.json(vote);
});

module.exports = router;
