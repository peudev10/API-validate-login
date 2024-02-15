
const form = document.querySelector('#formulario')

const nome = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const checkPassword = document.getElementById('check_password');
const msgErro = document.querySelector('.error');

function checarFormulario() {

   if (nome.value === '' || nome.value === undefined) {
      msgErro.innerHTML = 'O campo nome, precisa ser preenchido.';
      return false;
   }

   if (email.value === '' || email.value === undefined) {
      msgErro.innerHTML = 'O campo E-mail, precisa ser preenchido.';
      return false;
   }

   if (password.value === '' || password.value === undefined) {
      msgErro.innerHTML = 'O campo senha, precisa ser preenchido.';
      return false;
   }

   if (checkPassword.value === '' || checkPassword.value === undefined) {
      msgErro.innerHTML = 'A confirmação de senha, precisa ser preenchida.';
      return false;
   }

   if (password.value !== checkPassword.value) {
      msgErro.innerHTML = 'A senha digitada não está correta.';
      return false;
   }

   return true;
}

const cadastrar = async (event) => {
   event.preventDefault();

   const formulario = checarFormulario();

   if (formulario) {

      const dados = {
         nome: nome.value,
         email: email.value,
         password: password.value
      }

      await fetch('http://localhost:3000/validate', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(dados)
      })
      .then(async response => {
         const msg = await response.json();
         if(response.ok){
            window.location.href = './login.html';
         }
         else{
            console.log(msg.msg);
         }
      })
      .catch(error => {
         console.error('Erro na requisição:', error);
      }) 
      
   }
}

form.addEventListener('submit', cadastrar);
