var express = require('express');
var router = express.Router();
const axios = require('axios');
var http = require('http');
var request = require('request');
const fs = require('fs');
var path = require('path')

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(1);
    res.json('success response');
});

router.get('/mychannels', function (req, res, next) {
    
    request.get('https://content.googleapis.com/youtube/v3/channels?forUsername=androiddevelopers&part=snippet,contentDetails,statistics', {
        headers: {
            Authorization: getTokenFromSource()
        }
    }, function(error, response, body) {
		console.log(response.statusCode);
		if(response.statusCode === 401) {
			// get new token by passing refresh token
		}
        res.json(body);
    })
    // res.send('respond with a resource');
});

router.post('/generateToken', function (req, res, next) {
    let code = req.body.authorizationCode;
    //res.json('got ' + code);
	 var json = {
        "code": code,
        "client_id": "981023211668-39afjftden4grotulm205emc3ttv0aat.apps.googleusercontent.com",
        "client_secret": "nsslOVltSlI0FvTvkdH8UiG6",
        "redirect_uri": "http://localhost:4200/callback",
        "grant_type": "authorization_code"
    };
    getAccessToken(json).then(function (response, body) {
        console.log(response.body);
        fs.writeFile('oauth.json', response.body, (err) => {
            if (err) throw err;
            console.log('token saved!');
            res.json('saved');
        });
    }, function (response, body) {
        console.log(response);
        res.statusCode = response.statusCode;
        res.send(response.body);
    });
});

var getAccessToken = function (json) {
    return new Promise(function (resolve, reject) {
        request.post('https://accounts.google.com/o/oauth2/token',
            { form: json },
            function (error, response, body) {
                console.log(response.statusCode);
                if (response.statusCode >= 400) {
                    reject(response, body);
                } else {
                    resolve(response, body);
                }
            });
    })
}
var getAccessTokenFromRefreshToken = function() {
	var json = {
        "client_id": "981023211668-39afjftden4grotulm205emc3ttv0aat.apps.googleusercontent.com",
        "client_secret": "nsslOVltSlI0FvTvkdH8UiG6",
        "refresh_token": token.id_token,
        "grant_type": "authorization_code"
    };
	getAccessToken(json).then(function(response, body) {
		console.log(response);
	})
}

router.post('/videos', function (req, res, next) {
    console.log(1);
	console.log(__basedir);
	console.log(req.body.videoUrl)
	
	var videoUrl = req.body.videoUrl;
	/*download(videoUrl, __basedir, function(res) {
		console.log(res);
	});*/
	var file = fs.createWriteStream('file.mp4');
	var request = http.get(videoUrl, function(response) {
		console.log(response);
	response.pipe(file);
});
    res.json('success response');
});

var getTokenFromSource = function () {
    var path = 'oauth.json';
    if (fs.statSync(path)) {
        var oauth = fs.readFileSync(path);
        var key = JSON.parse(oauth);
        var token = `${key.token_type} ${key.access_token}`;
        return token;
    }
    return null;
}

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

module.exports = router;
