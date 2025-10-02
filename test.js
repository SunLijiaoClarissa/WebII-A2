// test-connection.js
const mysql = require('mysql2');
const dbConfig = require('./db-details');

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    if (error) {
        console.error('连接失败:', error.message);
    } else {
        console.log('连接成功!');
        // 测试查询
        connection.query('SHOW TABLES', (err, results) => {
            if (err) throw err;
            console.log('数据库中的表:', results);
            connection.end();
        });
    }
});