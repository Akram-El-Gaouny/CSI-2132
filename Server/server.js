import express from "express";
import mySql from "mySql";
import cors from "cors";
import  Router from "./Routes/routes.js";
import fs from "fs";

const app = express();

// read the config file
let config = JSON.parse(fs.readFileSync('config.json'));

// adding middleware to our express app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create an Sql connection to the
export var SqlConnection = mySql.createConnection(config.dbConfig);

SqlConnection.connect((err) => {
  if (err) {
    console.error("An error occurred while connecting to mySQL:", err);
    process.exit(1);
  }

  console.log("Connected To SQL database");
});

// starting the server on port 8000
app.listen(config.serverConfig.port);
console.log(`Running on Port:${config.serverConfig.port}`);

// use the main router of the backend
app.use(Router);
