const { Schema, model } = require('mongoose');

const NotificacionSchema = Schema({
    idmedico: {
        type: Number,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    idpaciente: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    fecha:{
        type: Date,
        required: [true,'La fecha es requerida'],
    },/* 
    hora:{
        type: 
        required: [true,'La hora es requerida'],
    }, */
    leido: {
        type: Boolean,
        default: false
    },
});



NotificacionSchema.methods.toJSON = function() {
    const { __v,_id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Notificaciones', NotificacionSchema );
