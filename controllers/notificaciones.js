const { response, request } = require('express');
const Notificaciones = require("../models/notificacion");

const notificacionesGet = async (req = request, res = response) => {
    //const { idmedico } = req.params;
    //const query = { leido: false, idmedico: idmedico };
    const notificaciones = await Notificaciones.find();
    res.json(
        notificaciones
    );
}

const notifcacionesPut = async (req = request, res = response) => {
    const { idcita } = req.params;
    const notificacion = await Notificaciones.findOne({ idcita: idcita });
    if (!notificacion) {
        return res.status(400).json({
            msg: 'No existe una notificacion con el idcita ' + idcita
        });
    }
    if (!notificacion.leido) {
        notificacion.leido = true;
        await notificacion.save();
    }

    res.json(
        notificacion
    );
}

const notificacionesDelete = async (req = request, res = response) => {
    const { idtela } = req.params;
    const notificacion = await Notificaciones.findOne({ idtela: idtela });
    if (!notificacion) {
        return res.status(400).json({
            msg: 'No existe una notificacion con el idtela ' + idtela
        });
    }
    await Notificaciones.deleteOne({ idtela: idtela });
    res.json(
        notificacion
    );
}
module.exports = {
    notificacionesGet,
    notifcacionesPut,
    notificacionesDelete
}