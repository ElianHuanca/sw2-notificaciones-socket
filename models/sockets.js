const Notificaciones = require("./notificacion");


class Sockets {

    constructor(io) {

        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {

            console.log('cliente conectado');

            socket.on('disconnect', () => {
                console.log('cliente desconectado');
            });

            socket.on('notification_user', async(data) => {                
                console.log(data);
                
                let notification = {
                    'fecha': data.fecha,
                    'hora': data.hora,
                    'idmedico': data.idmedico,
                    'idpaciente': data.idpaciente,
                    'estado': data.estado,
                    'idcita': data.id            
                };                

                // Almacenar en la BD
                const cita = await Notificaciones.findOne({idcita: data.id});
                if(!cita){                    
                    const notificacion = new Notificaciones(notification);
                    await notificacion.save();
                }
                const query = {leido:false,idmedico: data.idmedico};
                const notificationes = await Notificaciones.find(query);

                this.io.emit('notification_processed_user', notificationes);
            });

            socket.on('notification_read', async(data) => {
                const query={idcita: data.id};
                const notificacion = await Notificaciones.findOne(query);
                notificacion.leido = true;
                await notificacion.save();
                const query2 = {leido:false,idmedico: data.idmedico};
                const notificationes = await Notificaciones.find(query2);
                this.io.emit('notification_processed_user', notificationes);
            });
        });
    }
}
module.exports = Sockets;