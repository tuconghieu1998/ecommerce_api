import http from "http";
import connectDB from "./config/db.js";
import express from 'express';
import router from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

// load env config
dotenv.config();

const {API_PORT} = process.env;

// connect MySQL Server
connectDB();

const app = express();

// set body parser
app.use(bodyParser.json());

// use router
app.use("/", router);

app.listen(API_PORT);

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// }); 