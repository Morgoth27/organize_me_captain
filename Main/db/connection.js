const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user:'root',
        password:'4K@k7pigdydC68q',
        database: 'employees_db'
    });

    connection.connect(function(err){
        if (err) throw err;
    });

    module.exports = connection;
