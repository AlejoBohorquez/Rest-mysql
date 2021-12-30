const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '192.168.1.120',  
    user: 'acceso', 
    password: 'Vip2021*', 
    database: 'vip'
});


mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;