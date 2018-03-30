var express = require('express');
var router = express.Router();
const {google} = require('googleapis');
const nconf = require('nconf');
const readline = require('readline');
const plus = google.plus('v1');
const path = require('path');
const OAuth2Client = google.auth.OAuth2;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
