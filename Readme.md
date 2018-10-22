#content-to-disk-writer#
A NodeJS server which accepts text contents over http POST request and writes them to the file "file-content.txt"


##Installation##
To install, first clone the repository and install the npm modules.
```bash
git clone https://bitbucket.org/kshitijjain/content-to-disk-writer.git
npm install
```

##Getting Started##
Start the server using `npm start` command
```bash
npm start
```
The server will start on port 3001.  
  
Navigate to http://localhost:3001/ in the browser to proceed. A form will open. Type the content to be written to the disk and press submit. A success message will be shown and the content will be stored in the file "file-content.txt".

##Unit Testing##
Unit test cases are written in mocha and chai. They are located in `test` directory.
To start the testing environment:
```bash
npm test
```