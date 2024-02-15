const app = require('./app');

const connection = require('./models/connection')

require('dotenv').config();

const PORT = process.env.PORT || 3000;

var conexao = connection.getConnection();

if(conexao){
    console.log('A conexão foi feita com sucesso');
    app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));

}
else{
    console.log('Erro ao se conectar com o banco');
}



