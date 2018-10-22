var http= require('http');
var fs= require('fs');
var { parse } = require('querystring');

var server= http.createServer(function(req, res){
    if(req.method== "GET"){
        var html= fs.readFileSync('index.html');
        res.end(html);
    }
    else if(req.method== "POST"){

        let fileContent= "";
        req.on('data', function(chunk){
            fileContent+= chunk.toString();
        });

        req.on('end', function(){
            var parsedFileContent= parse(fileContent);

            if(parsedFileContent.fileContent){
                fs.writeFile("file-content.txt", parsedFileContent.fileContent, function(error){
                    if(error){
                        console.log("Error in writing to disk!");
                        res.end("Error in writing to disk!");
                    }
                    else{
                        console.log("Content successfully written to file fileContent.txt");
                        res.end('Content successfully written to file "fileContent.txt"');
                    }
                });
            }
            else{
                res.end("Error! Please send data in fileContent key in POST request");
            }
            
        });
    }
});

exports.listen= function(port){
    server.listen(port, function(){
        console.log(`Server listening on port ${port}. Navigate to http://localhost:${port} to proceed.`);
    });
};

exports.close= function(){
    server.close();
};