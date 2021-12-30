require('dotenv').config()

const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 5000);


//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/persona'));


app.listen(process.env.PORT, () => {
    console.log('Server on port', process.env.PORT);
});