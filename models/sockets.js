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

            socket.on('notification_user', (data) => {                
                console.log(data);
                
                /* let notification = {
                    'fecha': data.fecha,
                    'hora': data.hora,
                    'idmedico': data.idmedico,
                    'idpaciente': data.idpaciente,
                    'estado': data.estado,
                    'id': data.id
                };                

                io.emit('notification_processed_user', notification); */
            });
        });
    }
}
module.exports = Sockets;