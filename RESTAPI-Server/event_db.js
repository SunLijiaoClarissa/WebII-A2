// Import required modules 
const mysql = require("mysql2");
const bodyParser = require("body-parser");

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