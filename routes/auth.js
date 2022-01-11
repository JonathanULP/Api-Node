const { Router } = require('express');
const { check } = require('express-validator');


const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post( '/login' , [
    check('email','El email es obligatorio').notEmpty(),
    check('email','No es un email válido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    check('password','La contraseña debe contener minimo 6 caracteres').isLength({min:6}),
    validarCampos
] , login);




module.exports = router;