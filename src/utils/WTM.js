const https = require('https');
const http = require('http');
const URL = require('url');
const Q = require("q");

module.exports = {
    execute : function(request) {
        var deferred = Q.defer()
        executeRequest(request.method, request.url, request.headers, request.body, function(statusCode, responseString) {
            let response = {
                request: request,
                isFromCache: false,
                statusCode: statusCode
            }
            if (responseString) {
                response["responseString"] = responseString
            }
    
            deferred.resolve(response)
        })
        return deferred.promise
    }
}

function executeRequest(method, url, headers, body, callback) {
    const myURL = URL.parse(url);
    const event = {
      "options": {
        "hostname": myURL.hostname,
        "path": myURL.path,
        "method": method,
        "headers": headers
      },
      "protocol": myURL.protocol
    };

    if (myURL.port) {
      event.options["port"] = myURL.port
    }

    if (body) {
      event.data = body
    }
          
    let HTTP = myURL.protocol === "http:" ? http : https;

    const req = HTTP.request(event.options, (res) => {
        let body = '';
        let statusCode = 200
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {

            callback(res.statusCode, body);
        });
    });
    req.on('error', callback);
    if (event.data) {
      req.write(JSON.stringify(event.data));
    }
    req.end();

}