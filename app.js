// Imports
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');

require('dotenv').config();

// Se ejecuta una instancia de conexión a la base de datos
const { sequelize } = require('./db');

sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));


const app = express();
require('ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


const port = process.env.PORT || 5000;
// Middlewares

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuración de File Upload
app.use(fileUpload());

// Routes
app.use(require('./routes/routes'));

// error 404
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/';
           }, 3000)           
        )();
        </script>
    </h1>`)
});
// Starting the server
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));