'use strict';
var fs = require('fs'),
    json;

var express = require('express');
var router = express.Router();
var voteInfo = require('../public/data/voteInfo.js');

/* GET home page. */
router.get('/v0.1', function(req, res) {
	console.log('MADE IT HERE: A');
	res.json(voteInfo);
});

router.get('/v0.1/:abbrev', function(req, res) {
	var abbrev = req.params.abbrev.toUpperCase();
	var success = false;
	for (var i = 0; i < voteInfo.states.length; i++) {
		if(voteInfo.states[i].abbreviation === abbrev) {
			res.json(voteInfo.states[i]);
			success = true;
		}
	}
	if(!success) { res.send(abbrev + ' is not a US state!'); }
});

module.exports = router;
