const http = require('http');
const port = 3000;
const app = require('./app');

const server = http.createServer(app);
if(server){
    console.log("server is created at ",port)
}
else{
    console.log("error while creating server ....");
}
server.listen(port);