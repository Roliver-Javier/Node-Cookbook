var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    querystring = require('querystring'),
    form = fs.readFileSync('form.html');
    
    http.createServer(function (request, response){
        switch(request.method){
            case 'POST':
                var postData = '';
                request.on('data',function(chunk){
                    postData += chunk;
                })
                .on('end', function(chunk){
                    var postDataObject = querystring.parse(postData);
                    response.end('You Posted:\n'+ util.inspect(postDataObject));
                });
            break;

            case 'GET':
                response.writeHead(200, {'Content-type':'text/html'});
                response.end(form);
            break;
        }
    }).listen(3001);