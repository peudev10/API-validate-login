const jwt = require('jsonwebtoken');
require('dotenv').config();

// checar se todos os dados estão sendo enviados corretamente no formulário
const validate_cadastro = (request, response, next) => {
    const { body } = request;

    if (body.nome === undefined || body.nome === '') {
        return response.status(400).json({ message: 'o campo de nome precisa ser preenchido' })
    }

    if (body.email === undefined || body.email === '') {
        return response.status(400).json({ message: 'o campo de email precisa ser preenchido' })
    }

    if (body.password === undefined || body.password === '') {
        return response.status(400).json({ message: 'o campo de Senha precisa ser preenchido' })
    }

    next();
}

const validate_login = (request, response, next) => {
    const { body } = request;

    if (body.email === undefined || body.email === '') {
        return response.status(400).json({ message: 'o campo de email precisa ser preenchido' })
    }

    if (body.password === undefined || body.password === '') {
        return response.status(400).json({ message: 'o campo de Senha precisa ser preenchido' })
    }

    next();
}

const validate_token = async (req, res, next) => {
    const { authorization } = req.headers;
    const parts = authorization.split(" ");
    const [schema, token] = parts;
    const secret = process.env.SECRET;


    if (!authorization) {
        return res.status(401);
    }

    if (parts.length !== 2) {
        return res.status(401).json({ msg: 'sem key' });
    }

    if (schema !== "bearer") {
        return res.status(401).json({ msg: 'sem bearer' });;
    }

    await jwt.verify(token, secret, (erro, decoded_key) => {
        if (erro) {
            return res.status(401).json({ msg: 'token invalido' });
        }
        next();
    });
}


module.exports = {
    validate_cadastro,
    validate_login,
    validate_token
}