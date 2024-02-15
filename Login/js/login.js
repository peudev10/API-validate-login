const form = document.querySelector('#formulario');
const email = document.getElementById('email');
const password = document.getElementById('password');
const error = document.querySelector('.error');

function checarFormulario(){

    if(email.value === undefined || email.value === ''){
        error.innerText= 'Digite um e-mail valido.';
        return false;
    }
    if(password.value === undefined || password.value === ''){
        error.innerText = 'Digite uma senha valida.';
        return false;
    }

    return true;
}

const login = async (event) =>{
    localStorage.removeItem('dadosUsuario');

    event.preventDefault();
    const checkFormulario = checarFormulario();

    const dados = {
        email: email.value,
        password: password.value
    }

    if(checkFormulario){
        
        await fetch('http://localhost:3000/validate-login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dados)
        })
        .then(async response =>{
            const req_dados = await response.json();
            if(response.ok){
                localStorage.setItem('dadosUsuario', JSON.stringify(req_dados));
                window.location.href = './perfil.html'
            }
            else{
                error.innerHTML = req_dados.msg
            }

        })
    }
};

form.addEventListener('submit', login);
