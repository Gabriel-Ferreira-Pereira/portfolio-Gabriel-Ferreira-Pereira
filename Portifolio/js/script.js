/* Alternância do Tema Claro para o Escuro usando as Variáveis do CSS */
const btnTema = document.getElementById('btnTema');
const temaSalvo = localStorage.getItem('tema'); /* Verifica se já Existe Preferência de Tema */

if (temaSalvo === 'dark') {
  document.body.classList.add('dark');
  btnTema.textContent = '☀️';
}

btnTema.addEventListener('click', function () {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    btnTema.textContent = '☀️';
    localStorage.setItem('tema', 'dark');
  } 
  else {
    btnTema.textContent = '🌙';
    localStorage.setItem('tema', 'light');
  }
});

/* Menu Hamburger para Dispositivos Móveis */
const btnMenu  = document.getElementById('btnMenu');
const navMenu  = document.getElementById('navMenu');
const linksNav = document.querySelectorAll('.navLink');

btnMenu.addEventListener('click', function () {
  navMenu.classList.toggle('navAberto');

  const estaAberto = navMenu.classList.contains('navAberto');
  btnMenu.setAttribute('aria-label', estaAberto ? 'Fechar Menu' : 'Abrir Menu');
});

linksNav.forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('navAberto');
    btnMenu.setAttribute('aria-label', 'Abrir Menu');
  });
});

/* Validação do Envio do Formulário */
function enviarFormulario(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  limparErros();

  let formularioValido = true;

  /* Validação do Nome */
  if (nome === '') {
    exibirErro('erroNome', 'nome', 'Por favor, informe seu nome.');
    formularioValido = false;
  }

  // --- Validação do E-mail ---
  if (email === '') {
    exibirErro('erroEmail', 'email', 'Por favor, informe seu e-mail.');
    formularioValido = false;
  } 
  else if (!emailValido(email)) {
    exibirErro('erroEmail', 'email', 'Informe um e-mail válido (ex: usuario@dominio.com).');
    formularioValido = false;
  }

  // --- Validação da Mensagem ---
  if (mensagem === '') {
    exibirErro('erroMensagem', 'mensagem', 'Por favor, escreva uma mensagem.');
    formularioValido = false;
  }

  if (formularioValido) {
    document.getElementById('formContato').reset();
    abrirModal();
  }

  return false;
}

/* Funções Essenciais */

// Exibe uma Mensagem de Erro em um Campo Específico
function exibirErro(idSpan, idCampo, mensagem) {
  document.getElementById(idSpan).textContent = mensagem;
  document.getElementById(idCampo).classList.add('erro');
}

// Remove Todas as Mensagens de Erro
function limparErros() {
  document.getElementById('erroNome').textContent = '';
  document.getElementById('erroEmail').textContent = '';
  document.getElementById('erroMensagem').textContent = '';
  document.getElementById('nome').classList.remove('erro');
  document.getElementById('email').classList.remove('erro');
  document.getElementById('mensagem').classList.remove('erro');
}

// Valida o Formato do E-Mail
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function abrirModal() {
  document.getElementById('modal').classList.add('modalAtivo');
}

function fecharModal() {
  document.getElementById('modal').classList.remove('modalAtivo');
}

document.getElementById('modal').addEventListener('click', function (event) {
  if (event.target === this) {
    fecharModal();
  }
});