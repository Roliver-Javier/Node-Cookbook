var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    mimeTypes = {
        '.js': 'text/javascript',
        '.html':'text/html',
        '.css': 'text/css'
    },
    cache = {
        store: {},
        maxSize: 26214400, //(bytes) 25mb
        maxAge: 5400 * 1000, //(ms) 1 and a half hours
        cleanAfter: 7200 * 1000,//(ms) two hours 
        cleanedAt: 0, //to be set dynamically
        clean: function (now) {
          if (now - this.cleanAfter > this.cleanedAt) {
            console.log('cleaning in progress...');
            this.cleanedAt = now;
            var that = this;
            Object.keys(this.store).forEach(function (file) {
              if (now > that.store[file].timestamp + that.maxAge) {
                delete that.store[file];
              }
            });
          }
        }
      };

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
