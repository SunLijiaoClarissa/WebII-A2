// Import required modules 
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const http = require("http");

// Import our db details
// var db = require("./db-details.js");

// Create db Connection
module.exports = {
    getConnection: ()=>{
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456",
            database: "charityevents_db"
        });
    }
};