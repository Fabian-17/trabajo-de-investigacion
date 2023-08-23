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
router.get('/', obtener);

//Obtener una imagen
router.get('/', buscar);
 
// Crear una imagen
router.post('/guardar/', cargar);
 
// Actualizar una imagen
router.put('/:id', actualizar);
 
// Eliminar una imagen
router.delete('/:id', destroy);

module.exports = router;