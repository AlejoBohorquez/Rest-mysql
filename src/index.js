require('dotenv').config()

const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(express.json());

//Routes
app.use(require('./routes/persona'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});
// app.listen(process.env.PORT, () => {
//     console.log('Server on port', process.env.PORT);
// });