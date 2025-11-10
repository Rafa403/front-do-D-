// estoque.js — versão atualizada com editar separado

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

// ======== Adicionar Ingrediente ========
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
    alert("Ingrediente já existe! Use o botão Editar (✎) para alterar a quantidade.");
    return;
  }

  window.estoque.push({ nome, qtd: Number(qtd) });
  salvarEstoque();
  atualizarEstoque();
  formIngrediente.reset();
  alert("Ingrediente adicionado com sucesso!");
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

    // Botão Editar (✎)
    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-edit";
    btnEdit.type = "button";
    btnEdit.textContent = "✎";
    btnEdit.title = "Editar quantidade";
    btnEdit.addEventListener("click", () => editarIngrediente(idx));

    // Botão Remover (×)
    const btnRemove = document.createElement("button");
    btnRemove.className = "btn-remove";
    btnRemove.type = "button";
    btnRemove.textContent = "×";
    btnRemove.title = "Excluir ingrediente";
    btnRemove.addEventListener("click", () => {
      if (confirm(`Remover ${i.nome} do estoque?`)) {
        window.estoque.splice(idx, 1);
        salvarEstoque();
        atualizarEstoque();
      }
    });

    li.appendChild(btnEdit);
    li.appendChild(btnRemove);
    listaEstoque.appendChild(li);
  });
}

// ======== Editar quantidade ========
function editarIngrediente(index) {
  const item = window.estoque[index];
  const novaQtd = prompt(`Editar quantidade de ${item.nome}:`, item.qtd);
  if (novaQtd === null) return; // cancelado
  const qtdNum = parseInt(novaQtd);
  if (isNaN(qtdNum) || qtdNum < 0) {
    alert("Informe uma quantidade válida.");
    return;
  }
  item.qtd = qtdNum;
  salvarEstoque();
  atualizarEstoque();
  alert("Quantidade atualizada com sucesso!");
}

// ======== Inicialização ========
window.carregarEstoque = carregarEstoque;
carregarEstoque();
