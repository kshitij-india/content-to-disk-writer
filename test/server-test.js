var request= require('request');
var expect= require('chai').expect;
var fs= require('fs');

var server= require('../server');

describe('Writing content to disk server tests', function(){

    before('start the server', function(){
        server.listen(3001);
    });

    it('should write to file "file-content.txt" whatever has been entered by the user', function(done){
        
        request.post({url: 'http://localhost:3001', form: {fileContent: "The quick brown jumps over a lazy dog"}}, function(error, response, body){
            expect(error).to.not.exist;
            expect(body).to.equal('Content successfully written to file "fileContent.txt"');

            fs.readFile('./file-content.txt', function(err, data){
                expect(err).to.not.exist;
                expect(data.toString()).to.equal("The quick brown jumps over a lazy dog");
                done();
            });
        });
    });

    it('should throw error if fileContent is not passed in POST request', function(done){

        request.post({url: 'http://localhost:3001', form: {file: "My name is Anthony Gonsalvez"}}, function(error, response, body){
            expect(body).to.equal("Error! Please send data in fileContent key in POST request");
            done();
        });
    });

    it('should render html file "index.html" on GET request', function(done){

        request('http://localhost:3001', function(error, response, body){

            expect(error).to.not.exist;

            fs.readFile('./index.html', function(err, data){
                expect(err).to.not.exist;
                expect(body).to.equal(data.toString());
                done();
            });
        });
    });

    after('close the server', function(){
        server.close();
    });
});