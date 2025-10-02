const express = require('express');
const router = express.Router();
const dbcon = require("../event_db");
const connection = dbcon.getConnection();

// Connect to db
connection.connect();

router.get("/events", (req, res) => {
	connection.query("SELECT * FROM events", (err, results) => {
		if (err) {
			console.log("Error when retriving the data");
		}
		else {
			res.json(results);
		}
	});
});

//get description
router.get("/events/:id", (req, res) => {
	const eventId = req.params.id;

	// 查询活动基本信息
	const eventQuery = `
        SELECT 
            e.*,
            o.name AS organizer_name,
            o.description AS organizer_description,
            o.email AS organizer_email,
            c.name AS category_name
        FROM 
            events e
        LEFT JOIN 
            organizations o ON e.organizer_id = o.id
        LEFT JOIN 
            categories c ON e.category_id = c.id
        WHERE 
            e.id = ?
    `;
	connection.query(eventQuery, eventId, (err, results) => {
		if (err) {
			console.log("Error when retriving the data");
		}
		else {
			res.json(results[0]);
		}
	});

});
module.exports = router;