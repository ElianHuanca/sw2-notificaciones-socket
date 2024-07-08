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
                
                for (const item of data) {
                    let notification = {                    
                        'idtela': item.idtela,
                        'nombre': item.nombre,
                        'rop': item.rop,
                        'stock': item.stock,
                    };
            
                    // Almacenar en la BD
                    const tela = await Notificaciones.findOne({ idtela: item.idtela });
                    if (!tela) {
                        const notificacion = new Notificaciones(notification);
                        await notificacion.save();
                    }else{
                        await Notificaciones.updateOne({ idtela: item.idtela }, { $set: { stock: item.stock } });                    
                    }
                }
                //const query = {idmedico: data.idmedico};
                const notificaciones = await Notificaciones.find();

                this.io.emit('notification_processed_user', notificaciones);
            });

            socket.on('notification_read', async(data) => {
                try {
                    const query = { idtela: data.idtela };
                    
                    // Eliminar la notificación específica
                    await Notificaciones.deleteOne(query);
                    
                    // Obtener las notificaciones restantes
                    const notificaciones = await Notificaciones.find();
                    
                    // Emitir las notificaciones actualizadas
                    this.io.emit('notification_processed_user', notificaciones);
                } catch (error) {
                    console.error('Error processing notification:', error);
                }                
            });
        });
    }
}
module.exports = Sockets;

