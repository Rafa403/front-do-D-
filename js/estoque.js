// estoque.js — versão limpa e funcional

const formIngrediente = document.getElementById("formIngrediente");
const listaEstoque = document.getElementById("listaEstoque");

window.estoque = window.estoque || [];

// ======== Funções de salvar e carregar ========
function salvarEstoque() {
  localStorage.setItem("estoque", JSON.stringify(window.estoque));
}

function carregarEstoque() {
  window.estoque = JSON.parse(localStorage.getItem("estoque") || "[]");
  atualizarEstoque();
}

// ======== Adicionar / Atualizar Ingrediente ========
formIngrediente?.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nomeIngrediente").value.trim();
  const qtd = parseInt(document.getElementById("qtdIngrediente").value);

  if (!nome || isNaN(qtd)) {
    alert("Informe o nome e uma quantidade válida.");
    return;
  }

  const existente = window.estoque.find(
    i => i.nome.toLowerCase() === nome.toLowerCase()
  );

  if (existente) {
    existente.qtd = Number(qtd); // atualiza quantidade
  } else {
    window.estoque.push({ nome, qtd: Number(qtd) }); // novo ingrediente
  }

  salvarEstoque();
  atualizarEstoque();
  formIngrediente.reset();
  alert("Estoque atualizado com sucesso!");
});

// ======== Atualizar lista de ingredientes ========
function atualizarEstoque() {
  if (!listaEstoque) return;

  listaEstoque.innerHTML = "";

  window.estoque.forEach((i, idx) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${i.nome}: ${i.qtd} unidades`;
    li.appendChild(span);

    const btn = document.createElement("button");
    btn.className = "btn-remove";
    btn.type = "button";
    btn.textContent = "×";
    btn.addEventListener("click", () => {
      if (confirm(`Remover ${i.nome} do estoque?`)) {
        window.estoque.splice(idx, 1);
        salvarEstoque();
        atualizarEstoque();
      }
    });

    li.appendChild(btn);
    listaEstoque.appendChild(li);
  });
}

// ======== Inicialização ========
window.carregarEstoque = carregarEstoque;
carregarEstoque();
