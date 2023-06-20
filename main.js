let arrayIDs = [
  document.querySelector('.enviarAtividadeBotao'),
  document.querySelector('.atividades'),
  document.querySelector('div.divInput'),
  document.getElementById('botaoAdicionar')
];

arrayIDs[0].addEventListener('click', corFundo);
arrayIDs[0].addEventListener('click', salvarAtividade);
arrayIDs[3].addEventListener('click', criarPrimeiraAtividade);
let contador = 0;

function criarAtividade(id, conteudo) {
  contador = Math.max(contador, Number(id.replace('atividade', '')));

  let novaDiv = document.createElement('div');
  let novotextArea = document.createElement('textarea');

  let novoP = document.createElement('p');
  let novoInputSalvar = document.createElement('input');

  novaDiv.classList.add('divInput');
  novotextArea.required = true;
  novotextArea.autocomplete = 'off';
  novotextArea.id = id;
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

function criarPrimeiraAtividade() {
  contador++;
  criarAtividade('atividade' + contador, '');
}

function corFundo() {
  arrayIDs[0].style.backgroundColor = '#4c5153';
  setTimeout(function () {
    arrayIDs[0].style.backgroundColor = '#383c3e';
  }, 150);
}

function salvarAtividade() {
  const textarea = this.parentNode.parentNode.querySelector('textarea');
  const id = textarea.id;
  const conteudo = textarea.value;
  localStorage.setItem(id, conteudo);
}

window.addEventListener('load', function () {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const conteudo = localStorage.getItem(key);
    if (key.startsWith('atividade')) {
      const textarea = document.getElementById(key);
      if (textarea) {
        textarea.value = conteudo;
        textarea.addEventListener('keyup', e => {
          textarea.style.height = 'auto';
          let scrollAltura = e.target.scrollHeight;
          textarea.style.height = `${scrollAltura}px`;
        });
      } else {
        criarAtividade(key, conteudo);
        salvarAtividade.call(novoInputSalvar); // Chamada para salvar a atividade carregada
      }
    }
  }
});
