const { Schema, model } = require('mongoose');

const NotificacionSchema = Schema({
    /* idmedico: {
        type: Number,
        required: [true, 'El idmedico es obligatorio'],        
    },
    idpaciente: {
        type: Number,
        required: [true, 'El idpaciente es obligatorio'],
    },
    idcita: {
        type: Number,
        required: [true, 'La idcita es obligatoria'],
    },
    fecha:{
        type: Date,
        required: [true,'La fecha es requerida'],
    }, 
    hora:{
        type: String,
        required: [true,'La hora es requerida'],
    },
    estado: {
        type: String,
        required: [true,'El estado es requerido'],
    }, */
    idtela:{
        type:Number,
        required: [true,'El idtela es requerido'],
    },
    nombre:{
        type: String,
        required: [true,'El nombre es requerido'],
    },
    rop : {
        type: String,
        required: [true,'El rop es requerido'],
    },
    stock : {
        type: String,
        required: [true,'El stock es requerido'],
    },    
});



NotificacionSchema.methods.toJSON = function() {
    const { __v,_id, ...data  } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model( 'Notificaciones', NotificacionSchema );
