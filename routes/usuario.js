const { Router } = require('express');

const { getUsuario } = require('../controllers/usuario');

const router = Router();

router.get('/',getUsuario);



module.exports = router;