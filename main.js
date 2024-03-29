let arrayIDs = [
  document.querySelector('.enviarAtividadeBotao'),
  document.querySelector('.atividades'),
  document.querySelector('div.divInput'),
  document.querySelector('#botaoAdicionar'),
];

let contador = parseInt(localStorage.getItem('contador')) || 0;
let arrayIdAtividades = [];

arrayIDs[0].addEventListener('click', salvarAtividade);
arrayIDs[3].addEventListener('click', criarPrimeiraAtividade);

function criarPrimeiraAtividade() {
  contador++;
  localStorage.setItem('contador', contador.toString());
  criarAtividade(contador);
}

window.addEventListener('load', function () {
  for (let i = 1; i <= contador; i++) {
    const conteudo = localStorage.getItem('atividade' + i);
    if (conteudo) {
      criarAtividade(i, conteudo);
    }
  }
});

function criarAtividade(id, conteudo = '') {
  let novaDiv = document.createElement('div');
  let novotextArea = document.createElement('textarea');
  
  let novoP = document.createElement('p');
  let novoInputSalvar = document.createElement('input');
  
  novaDiv.classList.add('divInput');
  novotextArea.required = true;
  novotextArea.autocomplete = 'off';
  novotextArea.id = 'atividade' + id;
  novotextArea.classList.add('atividades');
  novotextArea.value = conteudo;
  
  novoInputSalvar.type = 'button';
  novoInputSalvar.value = 'Salvar';
  novoInputSalvar.classList.add('enviarAtividadeBotao');
  novaDiv.appendChild(novotextArea);
  novoP.appendChild(novoInputSalvar);
  novaDiv.appendChild(novoP);
  
  const main = document.querySelector('.main');
  main.appendChild(novaDiv);
  
  novotextArea.addEventListener('keyup', e => {
    novotextArea.style.height = 'auto';
    let scrollAltura = e.target.scrollHeight;
    novotextArea.style.height = `${scrollAltura}px`;
  });
  
  novoInputSalvar.addEventListener('click', salvarAtividade);
}

function salvarAtividade() {
  const textarea = this.parentNode.parentNode.querySelector('textarea');
  const id = textarea.id;
  const conteudo = textarea.value;
  localStorage.setItem(id, conteudo);
}

for (let i = 1; i <= contador; i++) {
  const textarea = document.getElementById('atividade' + i);

  if (textarea) {
    textarea.addEventListener('keyup', e => {
      textarea.style.height = 'auto';
      let scrollAltura = e.target.scrollHeight;
      textarea.style.height = `${scrollAltura}px`;
    });
  }
}