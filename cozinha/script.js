// cozinha/script.js — leitura e controle de pedidos da cozinha

const listaPedidos = document.getElementById("listaPedidos");
const listaHistorico = document.getElementById("listaHistorico");

function carregarPedidos() {
  return JSON.parse(localStorage.getItem("pedidosCozinha") || "[]");
}

let pedidos = carregarPedidos();
let historico = [];

function salvarPedidos() {
  localStorage.setItem("pedidosCozinha", JSON.stringify(pedidos));
}

function renderPedidos() {
  listaPedidos.innerHTML = "";
  pedidos.forEach(p => {
    const li = document.createElement("li");
    li.className = "pedido-item";
    li.innerHTML = `
      <strong>${p.cliente}</strong><br>
      🍕 ${p.pizza} | 🥤 ${p.bebida}<br>
      ➕ ${p.adicionais}<br>
      💰 R$ ${Number(p.total).toFixed(2)} | 🕒 ${p.hora}<br>
      <button class="btn-pronto">Pronto</button>
      <button class="btn-cancelar">Cancelar</button>
    `;

    li.querySelector(".btn-pronto").addEventListener("click", () => finalizarPedido(p.id, true));
    li.querySelector(".btn-cancelar").addEventListener("click", () => finalizarPedido(p.id, false));
    listaPedidos.appendChild(li);
  });
}

function finalizarPedido(id, pronto) {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return;

  pedido.status = pronto ? "Concluído" : "Cancelado";
  historico.push({ ...pedido, fim: new Date().toLocaleTimeString() });
  pedidos = pedidos.filter(p => p.id !== id);

  salvarPedidos();
  localStorage.setItem("historicoCozinha", JSON.stringify(historico));
  renderPedidos();
}

function carregarHistorico() {
  historico = JSON.parse(localStorage.getItem("historicoCozinha") || "[]");
  listaHistorico.innerHTML = "";
  historico.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.hora} - ${h.cliente} (${h.status})`;
    listaHistorico.appendChild(li);
  });
}

window.addEventListener("storage", (e) => {
  if (e.key === "pedidosCozinha") {
    pedidos = carregarPedidos();
    renderPedidos();
  }
});

renderPedidos();
carregarHistorico();
