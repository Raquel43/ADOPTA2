const express = require('express');
const router = express.Router();

const mascotasController = require('../controllers/mascotasController');

module.exports = function() {
     
    // Muestra todos los mascotas
    router.get('/mascotas',mascotasController.mostrarMascotas);

    // muestra un Mascota en especifico por su ID
    router.get('/mascotas/:idMascota',  mascotasController.mostrarMascota);

    // nuevo Mascota
    router.post('/mascotas', mascotasController.nuevoMascota);    

    // Actualizar Mascotas
    router.put('/mascotas', mascotasController.actualizarMascota);

    // Eliminar Mascotas
    router.delete('/mascotas/:idMascota', mascotasController.eliminarMascota);

    return router;
};