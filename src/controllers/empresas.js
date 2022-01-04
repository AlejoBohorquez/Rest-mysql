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
    const {Idempresa} = req.params;
    mysqlConnection.query('SELECT * FROM empresa WHERE Idempresa = ?', [Idempresa], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

}

const empresaPost = (req, res) =>{
    const { Nombre, Direccion, Idsuperadmin, Nit } = req.body;
    console.log(Nombre,Direccion,Idsuperadmin,Nit);
    const query = `
    INSERT INTO empresa (Nombre, Direccion, Idsuperadmin, Nit)
                         VALUES (?, ?, ?, ?)
    `;

    mysqlConnection.query(query, [Nombre, Direccion, Idsuperadmin, Nit], (err, rows, fields) => {
        if(!err){
            res.status(201).json({Status: 'Empresa Insertada' });
        } else {
            console.log(err);
        }
    })

}


const empresaPut = (req,res) =>{
    const { Nombre} =  req.body;
    const { Direccion} =  req.body;
    const { Nit} =  req.body;
    const { Idempresa } = req.params;
    console.log(Idempresa,Nombre,Direccion,Nit);

    const query = ' UPDATE empresa SET Nombre= (?) WHERE Idempresa = (?)';
    mysqlConnection.query(query, [Nombre, Idempresa], (err, rows, fields)=>{
         if(!err)
         {
             res.json({status: 'empresa actualizada'});
         } else {
             console.log('error');
         }
    });
 
 }

 const empresaDelete = (req, res) => {
    const { Idempresa } = req.params;
    console.log('borra ',Idempresa);
    mysqlConnection.query('DELETE FROM empresa WHERE Idempresa = ?', [Idempresa], (err, rows, fields) =>{
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