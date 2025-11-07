<<<<<<< HEAD
const formPizza = document.getElementById("formPizza");
const listaPizzas = document.getElementById("listaPizzas");

formPizza.addEventListener("submit", e => {
  e.preventDefault();
  const sabor = saborPizza.value;
  const valor = valorPizza.value;
  const li = document.createElement("li");
  li.textContent = `${sabor} - R$ ${parseFloat(valor).toFixed(2)}`;
  listaPizzas.appendChild(li);
  formPizza.reset();
});
=======
// cardapio.js (atualizado para usar .btn-remove)
const listaPizzas = document.getElementById("listaPizzas");
const listaBebidas = document.getElementById("listaBebidas");
const listaAdicionais = document.getElementById("listaAdicionais");

window.pizzas = window.pizzas || [];
window.bebidas = window.bebidas || [];
window.adicionais = window.adicionais || [];

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

function atualizarCardapio() {
  atualizarLista(listaPizzas, pizzas, "sabor");
  atualizarLista(listaBebidas, bebidas, "nome");
  atualizarLista(listaAdicionais, adicionais, "nome");
  if (typeof atualizarSelectsCardapio === 'function') atualizarSelectsCardapio();
}

function atualizarLista(elemento, lista, prop) {
  if (!elemento) return;
  elemento.innerHTML = "";
  lista.forEach((item, i) => {
    const li = document.createElement("li");
    const span = document.createElement('span');
    span.style.whiteSpace = 'nowrap'; // evitar quebra
    span.textContent = `${item[prop]} - R$ ${Number(item.valor).toFixed(2)}`;
    li.appendChild(span);

    const btn = document.createElement("button");
    btn.className = 'btn-remove';
    btn.textContent = "X";
    btn.type = 'button';
    btn.addEventListener('click', () => {
      if (confirm(`Remover ${item[prop]}?`)) {
        lista.splice(i, 1);
        salvarCardapio();
        atualizarCardapio();
        toast('Removido');
      }
    });

    li.appendChild(btn);
    elemento.appendChild(li);
  });
}

document.getElementById("formPizza")?.addEventListener("submit", e => {
  e.preventDefault();
  const sabor = document.getElementById('saborPizza').value.trim();
  const valor = parseFloat(document.getElementById('valorPizza').value);
  if (!sabor || isNaN(valor)) { toast('Informe sabor e valor'); return; }
  pizzas.push({ sabor, valor: Number(valor) });
  salvarCardapio(); atualizarCardapio(); e.target.reset(); toast("Pizza adicionada!");
});

document.getElementById("formBebida")?.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById('nomeBebida').value.trim();
  const valor = parseFloat(document.getElementById('valorBebida').value);
  if (!nome || isNaN(valor)) { toast('Informe nome e valor'); return; }
  bebidas.push({ nome, valor: Number(valor) });
  salvarCardapio(); atualizarCardapio(); e.target.reset(); toast("Bebida adicionada!");
});

document.getElementById("formAdicional")?.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById('nomeAdicional').value.trim();
  const valor = parseFloat(document.getElementById('valorAdicional').value);
  if (!nome || isNaN(valor)) { toast('Informe nome e valor'); return; }
  adicionais.push({ nome, valor: Number(valor) });
  salvarCardapio(); atualizarCardapio(); e.target.reset(); toast("Adicional adicionado!");
});

window.carregarCardapio = carregarCardapio;
window.atualizarCardapio = atualizarCardapio;
window.atualizarSelectsCardapio = function() {
  const pizzaSel = document.getElementById("pizzaPedido");
  const bebidaSel = document.getElementById("bebidaPedido");
  const adicionalSel = document.getElementById("adicionalPedido");
  if (!pizzaSel || !bebidaSel || !adicionalSel) return;

  pizzaSel.innerHTML = '<option value="">-- Selecione uma pizza --</option>';
  bebidaSel.innerHTML = '<option value="">-- Sem bebida --</option>';
  adicionalSel.innerHTML = "";

  window.pizzas.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${p.sabor} - R$ ${Number(p.valor).toFixed(2)}`;
    pizzaSel.appendChild(opt);
  });

  window.bebidas.forEach((b, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${b.nome} - R$ ${Number(b.valor).toFixed(2)}`;
    bebidaSel.appendChild(opt);
  });

  window.adicionais.forEach((a, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${a.nome} - R$ ${Number(a.valor).toFixed(2)}`;
    adicionalSel.appendChild(opt);
  });
};
>>>>>>> a344b54 (primeiras alteraçoes)
