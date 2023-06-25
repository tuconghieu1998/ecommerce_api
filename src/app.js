import http from "http";
import connectDB from "./config/db.js";
import express from 'express';
import router from "./routes/index.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';

// load env config
dotenv.config();

const {API_PORT} = process.env;

// connect MySQL Server
// connectDB();

const app = express();

const corsOptions ={
  origin:'http://localhost:3100', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// set body parser
app.use(bodyParser.json());

// use router
app.use("/", router);

app.listen(API_PORT, ()=>{
  console.log(`Server is running`);
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// }); 