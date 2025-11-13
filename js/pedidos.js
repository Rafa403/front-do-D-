// pedidos.js — controle de pedidos e integração com clientes e cardápio

const btnCadastrado = document.getElementById("btnCadastrado");
const btnNaoCadastrado = document.getElementById("btnNaoCadastrado");
const divCadastrado = document.getElementById("clienteCadastrado");
const divNaoCadastrado = document.getElementById("clienteNaoCadastrado");
const btnBuscar = document.getElementById("buscarCliente");
const dadosClienteDiv = document.getElementById("dadosCliente");
const formPedido = document.getElementById("formPedido");
const listaPedidos = document.getElementById("listaPedidos");
const totalPedidoSpan = document.getElementById("totalPedido");

let modoCadastrado = true;
window.pedidosEmAndamento = [];

// Garante que botões não causem submit
if (btnCadastrado) btnCadastrado.type = "button";
if (btnNaoCadastrado) btnNaoCadastrado.type = "button";
if (btnBuscar) btnBuscar.type = "button";

// ======== Alternância de cliente ========
function aplicarModoCliente() {
  if (modoCadastrado) {
    divCadastrado.style.display = "block";
    divNaoCadastrado.style.display = "none";
    btnCadastrado.classList.add("active");
    btnNaoCadastrado.classList.remove("active");
  } else {
    divCadastrado.style.display = "none";
    divNaoCadastrado.style.display = "block";
    btnCadastrado.classList.remove("active");
    btnNaoCadastrado.classList.add("active");
  }
}

btnCadastrado?.addEventListener("click", () => {
  modoCadastrado = true;
  aplicarModoCliente();
});
btnNaoCadastrado?.addEventListener("click", () => {
  modoCadastrado = false;
  aplicarModoCliente();
});

// ======== Buscar cliente pelo CPF ========
btnBuscar?.addEventListener("click", () => {
  const cpf = document.getElementById("cpfBusca").value.trim();
  const cliente = window.clientes?.find(c => c.cpf === cpf);
  dadosClienteDiv.textContent = cliente
    ? `Cliente: ${cliente.nome}, Endereço: ${cliente.end}, Tel: ${cliente.tel}`
    : "Cliente não encontrado!";
});

// ======== Pedidos em andamento ========
function salvarPedidosEmAndamento() {
  localStorage.setItem("pedidosEmAndamento", JSON.stringify(window.pedidosEmAndamento));
}

function carregarPedidosEmAndamento() {
  window.pedidosEmAndamento = JSON.parse(localStorage.getItem("pedidosEmAndamento") || "[]");
  renderizarPedidosEmAndamento();
}

// ======== Calcular total ========
function calcularTotal() {
  const pizzaIdx = document.getElementById("pizzaPedido")?.value;
  const bebidaIdx = document.getElementById("bebidaPedido")?.value;
  const adicionaisSel = Array.from(
    document.getElementById("adicionalPedido")?.selectedOptions || []
  ).map(o => o.value);

  let total = 0;
  if (pizzaIdx && window.pizzas?.[pizzaIdx]) total += Number(window.pizzas[pizzaIdx].valor);
  if (bebidaIdx && window.bebidas?.[bebidaIdx]) total += Number(window.bebidas[bebidaIdx].valor);
  adicionaisSel.forEach(i => {
    if (window.adicionais?.[i]) total += Number(window.adicionais[i].valor);
  });

  if (totalPedidoSpan) totalPedidoSpan.textContent = total.toFixed(2);
}

["pizzaPedido", "bebidaPedido", "adicionalPedido"].forEach(id => {
  document.getElementById(id)?.addEventListener("change", calcularTotal);
});

// ======== Registrar pedido ========
formPedido?.addEventListener("submit", e => {
  e.preventDefault();

  let clienteInfo = "";

  if (modoCadastrado) {
    const cpf = document.getElementById("cpfBusca").value.trim();
    const cliente = window.clientes?.find(c => c.cpf === cpf);
    if (!cliente) {
      toast("CPF não encontrado!");
      return;
    }
    clienteInfo = `${cliente.nome} - ${cliente.end} - ${cliente.tel}`;
  } else {
    const nome = document.getElementById("nomePedido").value.trim();
    const end = document.getElementById("enderecoPedido").value.trim();
    const tel = document.getElementById("telefonePedido").value.trim();
    if (!nome || !end) {
      toast("Nome e endereço do cliente são obrigatórios");
      return;
    }
    clienteInfo = `${nome} - ${end} - ${tel}`;
  }

  // Índices numéricos dos selects
  const pizzaIndexNum = Number(document.getElementById("pizzaPedido").value);
  const bebidaIndexNum = Number(document.getElementById("bebidaPedido").value);
  const adicionaisSelIdx = Array.from(document.getElementById("adicionalPedido").selectedOptions).map(
    o => Number(o.value)
  );

  // Dados do cardápio
  const pizzaObj = window.pizzas[pizzaIndexNum] || null;
  const bebidaObj = window.bebidas[bebidaIndexNum] || null;
  const adicionaisObjs = adicionaisSelIdx.map(i => window.adicionais[i]).filter(Boolean);

  const adicionaisText = adicionaisObjs
    .map(a => `${a.nome}`)
    .join(", ") || "-";

  const hora = new Date().toLocaleTimeString();
  const total = parseFloat(totalPedidoSpan?.textContent || "0") || 0;

  // Objeto usado no painel principal
  const pedido = {
    cliente: clienteInfo,
    pizza: pizzaObj ? `${pizzaObj.sabor} - R$ ${Number(pizzaObj.valor).toFixed(2)}` : "-",
    bebida: bebidaObj ? `${bebidaObj.nome} - R$ ${Number(bebidaObj.valor).toFixed(2)}` : "-",
    adicionais: adicionaisText,
    total,
    hora,
  };

  // ======== Enviar para a cozinha (NOMES CORRETOS) ========
  let pedidosCozinha = JSON.parse(localStorage.getItem("pedidosCozinha") || "[]");

  pedidosCozinha.push({
    id: Date.now(),

    cliente: modoCadastrado
      ? window.clientes.find(c =>
          c.cpf === document.getElementById("cpfBusca").value.trim()
        ).nome
      : document.getElementById("nomePedido").value.trim(),

    endereco: modoCadastrado
      ? window.clientes.find(c =>
          c.cpf === document.getElementById("cpfBusca").value.trim()
        ).end
      : document.getElementById("enderecoPedido").value.trim(),

    pizza: pizzaObj ? pizzaObj.sabor : "-",
    bebida: bebidaObj ? bebidaObj.nome : "-",
    adicionais: adicionaisText,
    total: total,
    hora: hora,
    status: "Em preparo"
  });

  localStorage.setItem("pedidosCozinha", JSON.stringify(pedidosCozinha));
  // ============================================================

  // ======== Salvar e atualizar localmente ========
  window.pedidosEmAndamento.push(pedido);
  salvarPedidosEmAndamento();
  renderizarPedidosEmAndamento();

  // ======== Histórico ========
  if (typeof adicionarHistorico === "function") {
    adicionarHistorico({
      cliente: pedido.cliente,
      pizza: pedido.pizza,
      bebida: pedido.bebida,
      adicional: pedido.adicionais,
      hora: pedido.hora,
      total: pedido.total,
    });
  }

  formPedido.reset();
  dadosClienteDiv.textContent = "";
  if (typeof atualizarSelectsCardapio === "function") atualizarSelectsCardapio();
  if (totalPedidoSpan) totalPedidoSpan.textContent = "0.00";
  toast("Pedido registrado e enviado para a cozinha!");
});

// ======== Renderizar pedidos locais ========
function renderizarPedidosEmAndamento() {
  if (!listaPedidos) return;
  listaPedidos.innerHTML = "";
  window.pedidosEmAndamento.forEach((p, idx) => {
    const div = document.createElement("div");
    div.className = "pedido-card";
    div.innerHTML = `
      <strong>${p.cliente}</strong><br>
      🍕 ${p.pizza} | 🥤 ${p.bebida}<br>
      ➕ ${p.adicionais}<br>
      💰 <strong>R$ ${Number(p.total).toFixed(2)}</strong><br>
      <small>${p.hora}</small>
    `;
    const btnPronto = document.createElement("button");
    btnPronto.textContent = "Concluir";
    btnPronto.type = "button";
    btnPronto.style.marginTop = "8px";
    btnPronto.addEventListener("click", () => {
      if (confirm("Marcar pedido como concluído?")) {
        window.pedidosEmAndamento.splice(idx, 1);
        salvarPedidosEmAndamento();
        renderizarPedidosEmAndamento();
        toast("Pedido concluído!");
      }
    });
    div.appendChild(btnPronto);
    listaPedidos.appendChild(div);
  });
}

window.carregarPedidosEmAndamento = carregarPedidosEnAndamento;
