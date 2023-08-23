const ctrl = {};
const path = require("path");
const Imagen = require('../models/model')

ctrl.renderindex = (req, res) => {
    res.render('index')
}

ctrl.rendercargar = (req, res) => {
    res.render('cargar');
}

 ctrl.obtener = async (req, res) => {
    try {
      const images = await Imagen.findAll();
  
      if (!images || images.length === 0) {
        throw {
          status: 404,
          message: "No hay imagenes registradas aún.",
        };
      }

  
      return res.json(images);
    } catch (error) {
      console.log(error);
    }
  };

   ctrl.buscar = async (req, res) => {
    const image = await Imagen.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    const uploadPath = path.join(
      __dirname,
      "../img/",
      `${image.nombre_original}`
    );
  
    return res.sendFile(uploadPath);
  };
  

   ctrl.cargar = async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: "No se encontraron imágenes para subir." });
      }
  
      const archivo = req.files.archivo;
      
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      const nombreArchivo = `${uniqueSuffix}-${archivo.name}`; // Cambia el nombre del archivo si es necesario
  
      const rutaGuardado = path.join(__dirname, "../img", nombreArchivo);
  
      archivo.mv(rutaGuardado, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error al subir la imagen." });
        }
  
        // Guardar la información de la imagen en la base de datos
        try {
          const nuevaImagen = await Imagen.create({
            nombre_original: archivo.name,
            nombre_guardado: nombreArchivo,
          });
  
          return res.status(201).json({ message: "Imagen subida exitosamente.", imagen: nuevaImagen });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Error del servidor." });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error del servidor." });
    }
  };
  

// Controlador para actualizar una imagen por su ID
ctrl.actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { nuevoNombre } = req.body;
  
      const image = await Imagen.findByPk(id);
  
      if (!image) {
        throw {
          status: 404,
          message: "Imagen no encontrada.",
        };
      }
  
      // Actualizar el nombre de la imagen si se proporciona
      if (nuevoNombre) {
        image.nombre_original = nuevoNombre;
        await image.save();
      }
  
      return res.json({ message: "Imagen actualizada exitosamente." });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json(error);
    }
  };

   ctrl.destroy = async (req, res) => {
    try {
      const image = await Imagen.findOne({
        where: {
          id: req.params.id,
        },
      });
  
      if (!image) {
        return res
          .status(404)
          .json({ message: "La imagen NO existe en la base de datos." });
      }
  
      await image.destroy(); // Elimina la imagen de la base de datos
      return res.status(200).json({ success: "Imagen eliminada correctamente." });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json(error);
    }
  };
  


module.exports = ctrl 