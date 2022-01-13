const { Router } = require('express');
const { check } = require('express-validator');


const { cargarArchivo, getDocumentoByUser, deleteDocument } = require('../controllers/documento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();

router.get('/',[
    validarJWT
],getDocumentoByUser);



router.post('/',[
    validarJWT,
    check('created','La fecha no es correcta').isDate({format: 'DD-MM-YYYY'}),
    check('description','La descripcion es obligatoria').notEmpty(),
    check('tag','La etiqueta debe ser una cadena de caracteres').isString(),
    validarCampos
],cargarArchivo);


router.delete('/:id',[
    validarJWT,
    check('id','El ID no es válido').isMongoId(),
    validarCampos
],deleteDocument);

 
module.exports = router;