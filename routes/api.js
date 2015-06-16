'use strict';
var fs = require('fs'),
    json;

var express = require('express');
var router = express.Router();
var voteInfo = require('../public/data/vote.js');

/* GET home page. */
router.get('/v0.1', function(req, res) {
	res.json(voteInfo);
});

router.get('/v0.1/:state', function(req, res) {
	var state = req.params.state.toUpperCase();
	var success = false;
	for (var i = 0; i < voteInfo.state.length; i++) {
		if(voteInfo.state[i].abbreviation === state) {
			res.json(voteInfo.state[i]);
			success = true;
		}
	}
	if(!success) { res.send(state + ' is not a US state!'); }
});

module.exports = router;
