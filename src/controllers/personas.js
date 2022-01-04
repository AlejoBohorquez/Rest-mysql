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
    const { Tipo, Identificacion, Nombre, Apellido, Perfil, Correo, Password, Estado, Destino, Pathfoto, Fechadeentrada, Fechadesalida } = req.body;
    const query = `
    INSERT INTO persona (Tipodeidentificacion, Identificacion, Nombres, Apellidos, Perfil, Correo, Password,
                         Estado, Destino, PathFoto, Fechadeentrada, Fechadesalida)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    mysqlConnection.query(query, [Tipo, Identificacion, Nombre, Apellido, Perfil, Correo, Estado, Password, Destino, Pathfoto, Fechadeentrada, Fechadesalida], (err, rows, fields) => {
        if(!err){
            res.status(201).json({Status: 'Persona Insertada' });
        } else {
            console.log(err);
        }
    })

}

const personaPut = (req,res) =>{
    const { Estado} =  req.body;
    const { id } = req.params;
    console.log(id,Estado);
    const query = ' UPDATE persona SET estado= (?) WHERE identificacion = (?)';
    mysqlConnection.query(query, [Estado, id], (err, rows, fields)=>{
         if(!err)
         {
             res.json({status: 'Persona Actualizada'});
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
            res.json({status: 'Persona Borrada'});
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