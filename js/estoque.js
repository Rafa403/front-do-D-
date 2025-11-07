<<<<<<< HEAD
const formIngrediente = document.getElementById("formIngrediente");
const listaEstoque = document.getElementById("listaEstoque");

formIngrediente.addEventListener("submit", e => {
  e.preventDefault();
  const nome = nomeIngrediente.value;
  const qtd = qtdIngrediente.value;
  const li = document.createElement("li");
  li.textContent = `${nome}: ${qtd} unidades`;
  listaEstoque.appendChild(li);
  formIngrediente.reset();
});
=======
// estoque.js (atualizado)
const formIngrediente = document.getElementById("formIngrediente");
const listaEstoque = document.getElementById("listaEstoque");

window.estoque = window.estoque || [];

function salvarEstoque() {
  localStorage.setItem("estoque", JSON.stringify(window.estoque));
}

function carregarEstoque() {
  window.estoque = JSON.parse(localStorage.getItem("estoque") || "[]");
  atualizarEstoque();
}

formIngrediente?.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById('nomeIngrediente').value.trim();
  const qtd = parseInt(document.getElementById('qtdIngrediente').value);
  if (!nome || isNaN(qtd)) { toast('Informe ingrediente e quantidade válidos'); return; }

  const existente = window.estoque.find(i => i.nome.toLowerCase() === nome.toLowerCase());
  if (existente) {
    existente.qtd = Number(qtd);
  } else {
    window.estoque.push({ nome, qtd: Number(qtd) });
  }

  salvarEstoque();
  atualizarEstoque();
  formIngrediente.reset();
  toast('Estoque atualizado');
});

function atualizarEstoque() {
  if (!listaEstoque) return;
  listaEstoque.innerHTML = "";
  window.estoque.forEach((i, idx) => {
    const li = document.createElement("li");
    const span = document.createElement('span');
    span.style.whiteSpace = 'nowrap';
    span.textContent = `${i.nome}: ${i.qtd} unidades`;
    li.appendChild(span);

    const btn = document.createElement('button');
    btn.className = 'btn-remove';
    btn.type = 'button';
    btn.textContent = 'X';
    btn.addEventListener('click', () => {
      if (confirm(`Remover ${i.nome} do estoque?`)) {
        window.estoque.splice(idx, 1);
        salvarEstoque();
        atualizarEstoque();
        toast('Item removido do estoque');
      }
    });

    li.appendChild(btn);
    listaEstoque.appendChild(li);
  });
}

window.carregarEstoque = carregarEstoque;
>>>>>>> a344b54 (primeiras alteraçoes)
