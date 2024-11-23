
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // Your database host
  user: 'root',            // Your database username
  password: 'root',    // Your database password
  database: 'musix',
  port: 3308 
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to the database as id ' + connection.threadId);
});

module.exports = connection;
