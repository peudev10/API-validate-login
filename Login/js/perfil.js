const nome = document.getElementById('perfil_nome');
const email = document.getElementById('perfil_email');


async function perfil(){

    const dadosUsuario = JSON.parse(localStorage.getItem('dadosUsuario'));
   
    if(dadosUsuario !== null){
        await fetch(`http://localhost:3000/validate/${dadosUsuario.id}`,{
            method: 'GET', 
            headers: {
                'Authorization': 'bearer ' + dadosUsuario.token,
                'Content-Type': 'application/json'}
            })
            .then(async response =>{
                const dados = await response.json();
            
                if(response.ok){
                    nome.innerText = 'Nome: ' + dados[0].nome;
                    email.innerText = 'E-mail: ' + dados[0].email;
                }
                else{
                    window.location.href = './login.html'
                }
            }).catch(error =>{
                window.location.href = './login.html'
            })
    }
    else{
        window.location.href = './login.html';
    }
}

perfil();
