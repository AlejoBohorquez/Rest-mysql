const { response } =  require('express');
const mysqlConnection = require('../database');

const empresasGet = (req, res) =>{
    mysqlConnection.query('SELECT * FROM empresa', (err,rows, fields) =>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

const empresaGet = (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM empresa WHERE idempresa = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

}

const empresaPost = (req, res) =>{
    const { nombre, direccion, id } = req.body;
    console.log(nombre,direccion,id);
    const query = `
    INSERT INTO empresa (nombre, direccion, idsuperadmin)
                         VALUES (?, ?, ?)
    `;

    mysqlConnection.query(query, [nombre, direccion, id], (err, rows, fields) => {
        if(!err){
            res.status(201).json({Status: 'Empresa Insertada' });
        } else {
            console.log(err);
        }
    })

}


const empresaPut = (req,res) =>{
    const { nombre} =  req.body;
    const { direccion} =  req.body;
    const { id } = req.params;
    console.log(id,nombre,direccion);

    const query = ' UPDATE empresa SET nombre= (?) WHERE idempresa = (?)';
    mysqlConnection.query(query, [estado, id], (err, rows, fields)=>{
         if(!err)
         {
             res.json({status: 'empresa actualizada'});
         } else {
             console.log('error');
         }
    });
 
 }

 const empresaDelete = (req, res) => {
    const { id } = req.params;
    console.log('borra ',id);
    mysqlConnection.query('DELETE FROM empresa WHERE idempresa = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Empresa Borrada'});
        } else{
            console.log(err);
        }
    });
}

module.exports = {

    empresaGet,
    empresasGet,
    empresaPost,
    empresaPut,
    empresaDelete
}