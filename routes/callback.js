var express = require('express');
var router = express.Router();
const axios = require('axios');
var http = require('http');
var request = require('request');
const fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.query.code);
    var json = {
        "code": req.query.code,
        "client_id": "981023211668-39afjftden4grotulm205emc3ttv0aat.apps.googleusercontent.com",
        "client_secret": "nsslOVltSlI0FvTvkdH8UiG6",
        "redirect_uri": "http://localhost:8080/callback",
        "grant_type": "authorization_code"
    };
    request.post('https://accounts.google.com/o/oauth2/token',
        { form: json },
        function (error, response, body) {
            fs.writeFile('oauth.json',body, (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;
                console.log('token saved!');
            });
            res.send(body);
        });
});

module.exports = router;
