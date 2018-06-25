var http = require('http'),
    urlOpts = {host: 'localhost',
               path: '/',
               port: '3001',
               method: 'POST'},
    request = http.request(urlOpts, function (response){
        response.on('data', function(chunk){
            console.log(chunk.toString());
        });
    }).on('error', function(e){
        console.log('error:'+ e.stack);
    });

    process.argv.forEach(function (postItem, index){
        if(index > 1) { request.write(postItem + '\n');}
    });
    request.end();