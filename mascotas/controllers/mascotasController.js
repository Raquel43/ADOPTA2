const Mascotas = require('../models/Mascotas');

// Muestra todos los mascotas
exports.mostrarMascotas = async (req, res, next) => {
    try {
        // obtener todos los mascotas
        const mascotas = await Mascotas.find({});
        res.json(mascotas);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un mascota en especifico por su ID
exports.mostrarMascota = async (req, res, next) => {
    const mascota = await Mascotas.findById(req.params.idMascota);

    if(!mascota) {
        res.json({mensaje : 'Ese Mascota no existe'});
        return next();
    }

    // Mostrar el mascota
    res.json(mascota);
};


// agrega un nuevo mascota
exports.nuevoMascota = async (req, res, next) => {
    const mascota = new Mascotas(req.body);
    try {
        // almacenar el registro
        await mascota.save();
        res.json({ mensaje : 'Se agrego un nuevo mascota' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un mascota via id
exports.actualizarMascota = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const mascota = await Mascotas.findOneAndUpdate(
            { _id : req.body.id }, 
            {
                nombre:req.body.nombre,
                descripcion:req.body.descripcion
            }, 
            //Opciones, devolver el nuevo objeto modificado
            {new : true}
        );
        res.json(mascota);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un mascota via ID
exports.eliminarMascota = async (req, res, next) => {
    try {
        await Mascotas.findByIdAndDelete({ _id : req.params.idMascota });
        res.json({mensaje : 'El Mascota se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
