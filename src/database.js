const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '192.168.1.120', //'us-cdbr-east-04.cleardb.com', 
    user: 'acceso', //b75c693e9afe5f', // root', 
    password: 'Vip2021*', //db534960', //'Vip2021*',
    database: 'vip'//'heroku_c75993627561ab7'//'company'
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