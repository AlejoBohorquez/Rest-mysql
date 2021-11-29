const express = require('express');
const router =express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM employees', (err,rows, fields) =>{
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

});

router.post('/',(req, res) =>{
    const {id, name, salary } = req.body;
    const query = `
        CALL employeedAddorEdit(?, ?, ?)
    `;

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Emplyeed Saved' });
        } else {
            console.log(err);
        }
    })

})

router.put('/:id', (req,res) =>{
   const { name, salary} =  req.body;
   const { id } = req.params;
   console.log(id,name,salary);
   const query = 'CALL employeedAddorEdit(?, ?, ?)';
   mysqlConnection.query(query, [id, name, salary], (err, rows, fields)=>{
        if(!err)
        {
            res.json({status: 'Employee Updated'});
        } else {
            console.log('error');
        }
   });

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('dato',id);
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({status: 'Employee Deleted'});
        } else{
            console.log(err);
        }
    });
});

module.exports = router;


