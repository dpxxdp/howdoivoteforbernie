'use strict';
var fs = require('fs'),
    json;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile('../public/index.html');
});

/* GET reminder page. */
router.get('/remind', function(req, res) {
	res.sendFile('../public/remind.html');
});

/* GET act page. */
router.get('/act', function(req, res) {
	res.sendFile('../public/act.html');
});

module.exports = router;
