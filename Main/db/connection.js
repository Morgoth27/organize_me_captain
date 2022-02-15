const mysql = require('mysql2');
const util = require('util');
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'4K@k7pigdydC68q',
        database: 'employees_db'
    });

    connection.query = util.promisify(connection.query);

    connection.connect(function(err){
        if (err) {
            throw err
        } else {
            console.log("Success! Connected to mysql.")
        }}
    );

    module.exports = connection;
