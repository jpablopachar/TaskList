const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const task = require('./routes/task');

const port = 3000;
const app = express();

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Establecer la carpeta estática
app.use(express.static(path.join(__dirname, 'client')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Rutas
app.use('/', index);
app.use('/api', tasks);

app.listen(port, () => {
  console.log('Servidor en puerto ' + port);
});