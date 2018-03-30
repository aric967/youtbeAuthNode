var express = require('express');
var router = express.Router();
const axios = require('axios');
var request = require('request');
const fs = require('fs');

/* var oauth = fs.readFileSync('oauth.json');
var key = JSON.parse(oauth);
var token = `${key.token_type} ${key.access_token}`; */

/* GET upload listing. */
router.get('/channels', function (req, res, next) {
  request.get('https://content.googleapis.com/youtube/v3/channels?forUsername=androiddevelopers&part=snippet,contentDetails,statistics', {
    headers: {
      Authorization: token
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    } else if (response.statusCode === 401) {
      var json = {
        "client_id": "981023211668-39afjftden4grotulm205emc3ttv0aat.apps.googleusercontent.com",
        "client_secret": "nsslOVltSlI0FvTvkdH8UiG6",
        "refresh_token": token.id_token,
        "grant_type": "authorization_code"
    };
      getAccessToken(json, function(res) {
        console.log(res);
      })
    }
    res.send(JSON.parse(body));
  })
});

router.get('/mychannels', function (req, res, next) {
  axios.get('https://content.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      console.log(response.data);
      res.send(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  // res.send('respond with a resource');
});



router.get('/video', function (req, res, next) {
  axios.get('https://content.googleapis.com/youtube/v3/channels?forUsername=androiddevelopers&part=snippet,contentDetails,statistics', {
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      console.log(response.data);
      res.send(response.data)
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
  // res.send('respond with a resource');
});

function getAccessToken(json, callback) {
  request.post('https://www.googleapis.com/oauth2/v4/token',
    { form: json },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
       callback(body);
      }
    }
  )
}

module.exports = router;
