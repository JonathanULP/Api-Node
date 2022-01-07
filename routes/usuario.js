const { Router } = require('express');

const { getUsuario,
        postUsuario } = require('../controllers/usuario');

const router = Router();

router.get('/',getUsuario);
router.post('/',postUsuario);



module.exports = router;