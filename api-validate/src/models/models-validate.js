const connection = require('./connection');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// checar se o email já existe no banco de dados
const check_exist_email = async (email) =>{
    try{
        const [row] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if(row.length > 0){
            return true
        }
        else{
            return false
        }

    }catch(error){
        return false;
    }
}


const createCadastro = async (dados) =>{
    const {nome, email, password} = dados;

    const checkEmail = await check_exist_email(email);// checar se o email existe

    if(checkEmail){
        return {msg: 'O email já está sendo usado.' , status: 401}
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    
    try{
        await connection.execute('INSERT INTO users(nome, email, password) VALUES(?,?,?)',[nome, email, passwordHash]);
        return {msg: 'Cadastro realizado com sucesso', status: 201};

    }catch(error){
        console.log(error);
        return {msg: 'Ocorreu um erro ao submeter o formulário', status: 400};
    }
}

const loginValidate = async (dados)=>{

    const {email, password} = dados;

    const [row] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if(row.length > 0){

        const checkPassword = await bcrypt.compare(password, row[0].password);

        if(!checkPassword){
            return {msg: 'Senha incorreta', status: 401};
        }

        try {
            const secret = process.env.SECRET;

            const token = jwt.sign({
                id: row[0].id
            }, secret, {expiresIn: 300})

            return {chave: true,token, id:row[0].id, status: 201}
            
        } catch (error) {
            console.log(error);
            return {msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' , status: 404}
        }
    }
    else{
        return {msg: 'Email inválido', status: 401};
    }
}

const getCadastro = async (id) =>{
    const [cadastro] = await connection.execute('SELECT nome, email FROM users WHERE id=?' , [id]);
    return cadastro;
}

module.exports = {
    createCadastro,
    loginValidate,
    getCadastro
}