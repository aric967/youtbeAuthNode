var express = require('express');
var router = express.Router();
const { google } = require('googleapis');
const plus = google.plus('v1');
const OAuth2Client = google.auth.OAuth2;
const axios = require('axios');


const CLIENT_ID = '981023211668-39afjftden4grotulm205emc3ttv0aat.apps.googleusercontent.com';
const CLIENT_SECRET = 'nsslOVltSlI0FvTvkdH8UiG6';
const REDIRECT_URL = 'http://localhost:8080/callback';
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req);

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token,
    prompt:'consent',
    scope: [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube'
    ]

    // can be a space-delimited string or an array of scopes
  });
  console.log(url);

  axios.get(url)
    .then(response => {
      // console.log(response.data)
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });

  // res.send('respond with a resource');
});

router.get("/searchYoutube", function (req, res, next) {
  axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyDNPnM0HZcNnwX4XBHawZ9UplKLQkkUObY').
    then(response => {
      // console.log(response.data)
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

module.exports = router;
