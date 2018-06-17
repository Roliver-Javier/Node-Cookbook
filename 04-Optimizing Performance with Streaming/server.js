var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    mimeTypes = {
        '.js': 'text/javascript',
        '.html':'text/html',
        '.css': 'text/css'
    },
    cache = {};

http.createServer(function(request,response){
    var lookup = path.basename(decodeURI(request.url));
    f = 'content/'+lookup;
    fs.exists(f, function(exists){
        if(exists){
            var headers = {'Content-type': mimeTypes[path.extname(f)]};
            if(cache[f]){
                console.log('from cache');
                response.writeHead(200, headers);
                response.end(cache[f].content);
                return;
            }
            var s = fs.createReadStream(f).once('open', function(){
                response.writeHead(200, headers);
                this.pipe(response);
            }).once('error', function(e){
                console.log(e);
                response.writeHead(500);
                response.end('Server Error');
            });

            fs.stat(f, function(err, stats){
                var bufferOffset = 0;
                cache[f] = {content: new Buffer(stats.size)};
                s.on('data', function(chunk){
                    chunk.copy(cache[f].content, bufferOffset);
                    bufferOffset += chunk.length;
                });
            });
            return;
        }
        response.writeHead(404);
        response.end('Page Not Found!');
    });
}).listen(3001);
