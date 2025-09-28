// test-db.js
const db = require('./event_db');

async function testConnection() {
  try {
    // 从连接池获取连接
    const connection = await db.getConnection();
    console.log('数据库连接成功！');

    // 执行一个简单查询
    const [rows] = await connection.query('SELECT 1 + 1 AS solution');
    console.log('测试查询结果:', rows[0].solution); // 应该输出2

    // 释放连接回连接池
    connection.release();
  } catch (error) {
    console.error('数据库连接失败:', error);
  }
}

testConnection();