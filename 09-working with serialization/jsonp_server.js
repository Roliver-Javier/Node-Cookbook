var http = require('http'),
    url = require('url'),
    profiles = require('./profiles');

    http.createServer(function(request, response){
        var urlObj = url.parse(request.url, true),
        cb = urlObj.query.callback, 
        who = urlObj.query.who,
        profile;

        if(cb && who){
            profile = cb + "("+ JSON.stringify(profiles[who])+")";
            response.end(profile);
        }
    }).listen(3001);