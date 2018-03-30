var request = require('request');

module.export = {
    getService = function () {
        return new Promise(function (resolve, reject) {
            request.get(url)
        });


    }
}