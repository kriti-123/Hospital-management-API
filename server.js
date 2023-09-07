const http = require("http");
const port = process.env.PORT || 4000;
require("dotenv").config();
const app = require("./app");

const server = http.createServer(app);
if (server) {
  console.log("server is created at ", port);
} else {
  console.log("error while creating server ....");
}
server.listen(port);
