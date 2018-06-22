var fs = require('fs'),
    queryString = require('querystring'),
    util = require('util'),
    bodyParser = require('body-parser'),
    form = fs.readFileSync('form.html'),
    connect = require('connect');

    connect(connect.limit('2mb'),
            bodyParser(),function(request, response){
        switch(request.method){
            case 'POST':
                console.log('User Posted:\n', request.body);
                response.end('You posted:\n'+ util.inspect(request.body));
            break;

            case 'GET':
                response.writeHead(200, {'Content-type': 'text/html'});
                response.end(form);
            break;
        }
    }).listen(3001);