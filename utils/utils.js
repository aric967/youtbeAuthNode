var request = require('request');

module.exports = {
    getService: function (url) {
        return new Promise(function (resolve, reject) {
            request.get(url, {
                headers: {
                    Authorization: getTokenFromSource()
                }
            }, function (error, response, body) {
                resolve(error, response, body);
            })
        });
    },
    postService: function (url, data) {
        return new Promise(function (resolve, reject) {
            request.post(url, {
                form: data
            }, function (error, response, body) {
                console.log(response, body)
                resolve(error, response, body);
            })
        })
    },
    getTokenFromSource: function () {
        var path = 'oauth.json';
        if (fs.existsSync(path) && fs.statSync(path)) {
            var oauth = fs.readFileSync(path);
            var key = JSON.parse(oauth);
            var token = `${key.access_token}`;
            return token;
        }
        return null;
    }
}