const router = require('express').Router();
const {
    renderindex,
    rendercargar
} = require('../controllers/controller')


router.get('/', renderindex);
router.get('/guardar', rendercargar);

// Obtener todas las imagenes
router.get('/api/', );

//Obtener una imagen
router.get('/api/', );
 
// Crear una imagen
router.post('/api/', );
 
// Actualizar una imagen
router.put('/api/:id', );
 
// Eliminar una imagen de forma lógica
router.delete('/api/:id', );

module.exports = router;