const { Router } = require('express');
const { check } = require('express-validator');


const { cargarArchivo } = require('../controllers/documento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();

router.post('/',[
    validarJWT,
    check('created','La fecha no es correcta').isDate({format: 'DD-MM-YYYY'}),
    check('description','La descripcion es obligatoria').notEmpty(),
    check('tag','La etiqueta debe ser una cadena de caracteres').isString(),
    check('id_usuario','El id no es válido').isMongoId(),
    validarCampos
],cargarArchivo);


module.exports = router;