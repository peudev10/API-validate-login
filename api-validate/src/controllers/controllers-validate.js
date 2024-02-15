
const models_validate = require('../models/models-validate');


const createCadastro = async (req,res) =>{
    
    const cadastro = await models_validate.createCadastro(req.body)
    
    return res.status(cadastro.status).json(cadastro);
}

const loginValidate = async (req,res) => {
    const login = await models_validate.loginValidate(req.body);
    
    return res.status(login.status).json(login);
}

const getCadastro = async (req, res) => {
    const {id} = req.params
    const cadastro = await models_validate.getCadastro(id);
    return res.status(200).json(cadastro);
}

module.exports = {
    createCadastro,
    loginValidate,
    getCadastro
}