var http = require('http'),
    formidable = require('formidable'),
    fs = require('fs'),
    form = fs.readFileSync('form-upload.html');

    http.createServer(function(request, response){
        switch(request.method){
            case 'POST':
                var incoming = new formidable.IncomingForm();
                incoming.uploadDir = 'uploads';

                incoming
                .on('fileBegin', function(field, file){
                    if(file.name){
                        file.path += '-'+file.name;
                    }
                })
                .on('file', function(field, file){
                    if(!file.size){ return ;};
                    response.write(file.name + 'received\n');
                }).on('end', function(){
                    response.end('All files received');
                });
                incoming.parse(request);
            break;

            case 'GET':
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(form);
            break;
        }
    }).listen(3001);