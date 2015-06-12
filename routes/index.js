'use strict';
var fs = require('fs'),
    json;

var express = require('express');
var router = express.Router();
var vote = require('../public/data/vote.js');

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) === 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = express.static(__dirname + file);
    return readJsonFileSync(filepath);
}

/* GET home page. */
router.get('/', function(req, res) {
	res.json(vote);
});

module.exports = router;
