const express = require('express');
const router = express.Router();
const dbcon = require("../event_db");
const connection = dbcon.getConnection();

// Connect to db
connection.connect();

router.get("/events", (req, res) => {
	connection.query("SELECT * FROM events", (err, results) => {
		if(err) {
			console.log("Error when retriving the data");
		}
		else {
			res.json(results);
		}
	});
});

module.exports = router;