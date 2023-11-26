const { Router } = require('express');

const { notificacionesGet,
        notifcacionesPut
} = require('../controllers/notificaciones');

const router = Router();


router.get('/:idmedico', notificacionesGet );

router.put('/:idcita', notifcacionesPut );
module.exports = router;