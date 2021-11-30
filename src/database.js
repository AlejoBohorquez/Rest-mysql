const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com', 
    user: 'b75c693e9afe5f', // root', 
    password: 'db534960', //'Vip2021*',
    database: 'heroku_c75993627561ab7'//'company'
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