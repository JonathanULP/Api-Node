const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, getDocumentoByUser, deleteDocument, getArchivo, getDocumentosEliminados, getDocumentPorNombreEtiqueta , getDocumentosFavoritos , updateArchivo , getDocumentoFull} = require('../controllers/documento');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();

router.get('/',[
    validarJWT
],getDocumentoByUser);

router.get('/full/:id',[
    validarJWT
],getDocumentoFull);

router.get('/search/:filtro',[
    validarJWT
],getDocumentPorNombreEtiqueta);

router.get('/eliminados',[
    validarJWT
],getDocumentosEliminados);

router.get('/favoritos',[
    validarJWT
],getDocumentosFavoritos);



router.get('/:id',[
    validarJWT,
    check('id','El ID no es válido')
],getArchivo);



router.post('/',[
    validarJWT,
    check('created','La fecha no es correcta').isDate({format: 'DD-MM-YYYY'}),
    check('description','La descripcion es obligatoria').notEmpty(),
    check('tag','La etiqueta debe ser una cadena de caracteres').isString(),
    validarCampos
],cargarArchivo);

router.put('/:id',[
    validarJWT,
    check('id','El Id no es válido').isMongoId(),
    validarCampos
],updateArchivo);


router.delete('/:id',[
    validarJWT,
    check('id','El ID no es válido').isMongoId(),
    validarCampos
],deleteDocument);

 
module.exports = router;