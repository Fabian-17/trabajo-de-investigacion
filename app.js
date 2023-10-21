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

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadDir = path.join(__dirname, 'uploads');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });   

  // Ruta para manejar la subida de archivos
app.post('/upload', upload.single('image'), (req, res) => {
    const imagePath = req.file.path;
  
    // Subir la imagen a Cloudinary
    cloudinary.uploader.upload(imagePath, (error, result) => {
      if (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        res.redirect('/');
      } else {
        // Mostrar el enlace a la imagen subida
        const imageUrl = result.secure_url;
        res.render('success', { imageUrl });
      }
    });
  });


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