import http from "http";
import connectDB from "./config/db.js";
import express from 'express';
import router from "./routes/index.js";

const port = 3000;

// connect MySQL Server
connectDB();

const app = express();

// use router
app.use("/api", router);
  
app.listen(port);

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// }); 