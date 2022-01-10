const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const {  emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');
const { getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario } = require('../controllers/usuario');

const router = Router();

router.get('/',getUsuario);

router.post('/',[
    check('name','El nombre es obligatorio').notEmpty(),
    check('email','El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6,max:15}),
    validarCampos
],postUsuario);

router.put('/:id',[
    check('id','El ID no es válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],putUsuario);


router.delete('/:id',[
    check('id','El ID no es válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],deleteUsuario)



module.exports = router;