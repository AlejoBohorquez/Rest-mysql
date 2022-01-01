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
    mysqlConnection.query('SELECT * FROM area WHERE idarea = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

}

const areaPost = (req, res) =>{
    const { nombre, id } = req.body;
    const query = `
    INSERT INTO area (nombre, idempresa)
                         VALUES (?, ?)
    `;

    mysqlConnection.query(query, [nombre, id], (err, rows, fields) => {
        if(!err){
            res.status(201).json({Status: 'Area Insertada' });
        } else {
            console.log(err);
        }
    })

}

const areaPut = (req,res) =>{
    const { nombre} =  req.body;
    const { idempresa} =  req.body;
    const { id } = req.params;
    console.log(id,idempresa,nombre);

    const query = ' UPDATE area SET nombre= (?) WHERE idarea = (?)';
    mysqlConnection.query(query, [nombre, id], (err, rows, fields)=>{
         if(!err)
         {
             res.json({status: 'Area Actualizada'});
         } else {
             console.log('error');
         }
    });
 
 }

 const areaDelete = (req, res) => {
    const { id } = req.params;
    console.log('borre ',id);
    mysqlConnection.query('DELETE FROM area WHERE idarea = ?', [id], (err, rows, fields) =>{
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