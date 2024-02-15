const express = require('express');
const router = express.Router();
const middleware = require('./middlewares/middlewares')


const controllers = require('./controllers/controllers-validate');

router.post('/validate',middleware.validate_cadastro, controllers.createCadastro); // criar cadastro 
router.post('/validate-login',middleware.validate_login, controllers.loginValidate); // logar
router.get('/validate/:id', middleware.validate_token, controllers.getCadastro); // acessar perfil



module.exports = router;

