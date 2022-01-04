const { response } =  require('express');
const mysqlConnection = require('../database');


const areasGet = (req, res) =>{
    mysqlConnection.query('SELECT * FROM area', (err,rows, fields) =>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

const areaGet = (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM area WHERE Idarea = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

}

const areaPost = (req, res) =>{
    const { Nombre, Idempresa } = req.body;
    const query = `
    INSERT INTO area (Nombre, Idempresa)
                         VALUES (?, ?)
    `;

    mysqlConnection.query(query, [Nombre, Idempresa], (err, rows, fields) => {
        if(!err){
            res.status(201).json({Status: 'Area Insertada' });
        } else {
            console.log(err);
        }
    })

}

const areaPut = (req,res) =>{
    const { Nombre} =  req.body;
    const { Idempresa} =  req.body;
    const { Idarea } = req.params;
    console.log(Idarea,Idempresa,Nombre);

    const query = ' UPDATE area SET Nombre= (?) WHERE idarea = (?)';
    mysqlConnection.query(query, [Nombre, Idarea], (err, rows, fields)=>{
         if(!err)
         {
             res.json({status: 'Area Actualizada'});
         } else {
             console.log('error');
         }
    });
 
 }

 const areaDelete = (req, res) => {
    const { Idarea } = req.params;
    console.log('borre ',Idarea);
    mysqlConnection.query('DELETE FROM area WHERE Idarea = ?', [Idarea], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Area Borrada'});
        } else{
            console.log(err);
        }
    });
}

module.exports= {
    areasGet,
    areaGet,
    areaPost,
    areaPut,
    areaDelete
}