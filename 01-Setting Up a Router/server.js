var http = require('http'),
    path = require('path'),
    pages = {
        '': 'Hello World!',
        'about': 'About content!',
        'page': 'this is other'
    };

    http.createServer(function(
        request, response
    ){
        var lookup = path.basename(decodeURI(request.url));
        response.writeHead(200,{'Content-Type': 'text/html'});
        response.end(pages[lookup]);
        
        if(!response.finished){
            response.writeHead(404);
            response.end('Page not found!');
        }
    }).listen(3000);
