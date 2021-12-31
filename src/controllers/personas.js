const { response } =  require('express');
const mysqlConnection = require('../database');

const personasGet = (req, res) =>{
    mysqlConnection.query('SELECT * FROM persona', (err,rows, fields) =>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

const personaGet = (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM persona WHERE Identificacion = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

}

const personaPost = (req, res) =>{
    const { tipo, identificacion, nombre, apellido, perfil, correo, password, estado, destino, pathfoto, fechadeentrada, fechadesalida } = req.body;
    const query = `
    INSERT INTO persona (Tipodeidentificacion, Identificacion, Nombres, Apellidos, Perfil, Correo, Password,
                         Estado, Destino, PathFoto, Fechadeentrada, Fechadesalida)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    mysqlConnection.query(query, [tipo, identificacion, nombre, apellido, perfil, correo, estado, password, destino, pathfoto, fechadeentrada, fechadesalida], (err, rows, fields) => {
        if(!err){
            res.status(201).json({Status: 'Persona Insertada' });
        } else {
            console.log(err);
        }
    })

}

const personaPut = (req,res) =>{
    const { estado} =  req.body;
    const { id } = req.params;
    console.log(id,estado);
    const query = ' UPDATE persona SET estado= (?) WHERE identificacion = (?)';
    mysqlConnection.query(query, [estado, id], (err, rows, fields)=>{
         if(!err)
         {
             res.json({status: 'persona actualizada'});
         } else {
             console.log('error');
         }
    });
 
 }

 const personaDelete = (req, res) => {
    const { id } = req.params;
    console.log('dato',id);
    mysqlConnection.query('DELETE FROM persona WHERE Identificacion = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Empleado Borrado'});
        } else{
            console.log(err);
        }
    });
}


module.exports = {
    personasGet,
    personaGet,
    personaPost,
    personaPut,
    personaDelete
}