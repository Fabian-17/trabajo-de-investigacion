const router = require('express').Router();
const {
    renderindex,
    rendercargar,
    cargar,
    actualizar,
    destroy,
    buscar,
    obtener
} = require('../controllers/controller')


router.get('/', renderindex);
router.get('/guardar', rendercargar);

// Obtener todas las imagenes
router.get('/api/', obtener);

//Obtener una imagen
router.get('/api/', buscar);
 
// Crear una imagen
router.post('/api/guardar/', cargar);
 
// Actualizar una imagen
router.put('/api/:id', actualizar);
 
// Eliminar una imagen
router.delete('/api/:id', destroy);

module.exports = router;