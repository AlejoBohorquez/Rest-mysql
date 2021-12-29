const express = require('express');
const router =express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM persona', (err,rows, fields) =>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM persona WHERE Identificacion = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

});

router.post('/',(req, res) =>{
    const { tipo, identificacion, nombre, apellido, perfil, correo, password, estado, destino, pathfoto, fechadeentrada, fechadesalida } = req.body;
    const query = `
    INSERT INTO persona (Tipodeidentificacion, Identificacion, Nombres, Apellidos, Perfil, Correo, Password,
                         Estado, Destino, PathFoto, Fechadeentrada, Fechadesalida)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    mysqlConnection.query(query, [tipo, identificacion, nombre, apellido, perfil, correo, estado, password, destino, pathfoto, fechadeentrada, fechadesalida], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Persona Insertada' });
        } else {
            console.log(err);
        }
    })

})

router.put('/:id', (req,res) =>{
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

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('dato',id);
    mysqlConnection.query('DELETE FROM persona WHERE Identificacion = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Persona Borrada'});
        } else{
            console.log(err);
        }
    });
});

module.exports = router;


