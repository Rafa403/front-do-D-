// cardapio.js — versão atualizada com botão ✎ de edição

const listaPizzas = document.getElementById("listaPizzas");
const listaBebidas = document.getElementById("listaBebidas");
const listaAdicionais = document.getElementById("listaAdicionais");

window.pizzas = window.pizzas || [];
window.bebidas = window.bebidas || [];
window.adicionais = window.adicionais || [];

// ======== Funções de salvar e carregar ========
function salvarCardapio() {
  localStorage.setItem("pizzas", JSON.stringify(pizzas));
  localStorage.setItem("bebidas", JSON.stringify(bebidas));
  localStorage.setItem("adicionais", JSON.stringify(adicionais));
}

function carregarCardapio() {
  window.pizzas = JSON.parse(localStorage.getItem("pizzas") || "[]");
  window.bebidas = JSON.parse(localStorage.getItem("bebidas") || "[]");
  window.adicionais = JSON.parse(localStorage.getItem("adicionais") || "[]");
  atualizarCardapio();
}

// ======== Atualizar listas ========
function atualizarCardapio() {
  atualizarLista(listaPizzas, pizzas, "sabor");
  atualizarLista(listaBebidas, bebidas, "nome");
  atualizarLista(listaAdicionais, adicionais, "nome");
  if (typeof atualizarSelectsCardapio === "function") atualizarSelectsCardapio();
}

function atualizarLista(elemento, lista, prop) {
  if (!elemento) return;
  elemento.innerHTML = "";

  lista.forEach((item, i) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${item[prop]} - R$ ${Number(item.valor).toFixed(2)}`;
    li.appendChild(span);

    // Botão Editar (✎)
    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-edit";
    btnEdit.type = "button";
    btnEdit.textContent = "✎";
    btnEdit.title = "Editar valor";
    btnEdit.addEventListener("click", () => editarItem(lista, i, prop));

    // Botão Remover (×)
    const btnRemove = document.createElement("button");
    btnRemove.className = "btn-remove";
    btnRemove.type = "button";
    btnRemove.textContent = "×";
    btnRemove.title = "Remover item";
    btnRemove.addEventListener("click", () => {
      if (confirm(`Remover ${item[prop]}?`)) {
        lista.splice(i, 1);
        salvarCardapio();
        atualizarCardapio();
      }
    });

    li.appendChild(btnEdit);
    li.appendChild(btnRemove);
    elemento.appendChild(li);
  });
}

// ======== Editar valor ========
function editarItem(lista, index, prop) {
  const item = lista[index];
  const novoValor = prompt(`Editar valor de ${item[prop]}:`, item.valor);
  if (novoValor === null) return;
  const valorNum = parseFloat(novoValor);
  if (isNaN(valorNum) || valorNum < 0) {
    alert("Informe um valor válido.");
    return;
  }
  item.valor = valorNum;
  salvarCardapio();
  atualizarCardapio();
  alert("Valor atualizado com sucesso!");
}

// ======== FORM PIZZAS ========
document.getElementById("formPizza")?.addEventListener("submit", e => {
  e.preventDefault();
  const sabor = document.getElementById("saborPizza").value.trim();
  const valor = parseFloat(document.getElementById("valorPizza").value);
  if (!sabor || isNaN(valor)) {
    alert("Informe o sabor e valor da pizza.");
    return;
  }
  pizzas.push({ sabor, valor: Number(valor) });
  salvarCardapio();
  atualizarCardapio();
  e.target.reset();
});

// ======== FORM BEBIDAS ========
document.getElementById("formBebida")?.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nomeBebida").value.trim();
  const valor = parseFloat(document.getElementById("valorBebida").value);
  if (!nome || isNaN(valor)) {
    alert("Informe o nome e valor da bebida.");
    return;
  }
  bebidas.push({ nome, valor: Number(valor) });
  salvarCardapio();
  atualizarCardapio();
  e.target.reset();
});

// ======== FORM ADICIONAIS ========
document.getElementById("formAdicional")?.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nomeAdicional").value.trim();
  const valor = parseFloat(document.getElementById("valorAdicional").value);
  if (!nome || isNaN(valor)) {
    alert("Informe o nome e valor do adicional.");
    return;
  }
  adicionais.push({ nome, valor: Number(valor) });
  salvarCardapio();
  atualizarCardapio();
  e.target.reset();
});

// ======== POPULA SELECTS DE PEDIDO ========
window.carregarCardapio = carregarCardapio;
window.atualizarCardapio = atualizarCardapio;
window.atualizarSelectsCardapio = function () {
  const pizzaSel = document.getElementById("pizzaPedido");
  const bebidaSel = document.getElementById("bebidaPedido");
  const adicionalSel = document.getElementById("adicionalPedido");
  if (!pizzaSel || !bebidaSel || !adicionalSel) return;

  pizzaSel.innerHTML = '<option value="">-- Selecione uma pizza --</option>';
  bebidaSel.innerHTML = '<option value="">-- Sem bebida --</option>';
  adicionalSel.innerHTML = "";

  window.pizzas.forEach((p, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${p.sabor} - R$ ${Number(p.valor).toFixed(2)}`;
    pizzaSel.appendChild(opt);
  });

  window.bebidas.forEach((b, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${b.nome} - R$ ${Number(b.valor).toFixed(2)}`;
    bebidaSel.appendChild(opt);
  });

  window.adicionais.forEach((a, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${a.nome} - R$ ${Number(a.valor).toFixed(2)}`;
    adicionalSel.appendChild(opt);
  });
};

// ======== Inicialização ========
carregarCardapio();
