<<<<<<< HEAD
=======
// pedidos.js (corrigido)
>>>>>>> a344b54 (primeiras alteraçoes)
const btnCadastrado = document.getElementById("btnCadastrado");
const btnNaoCadastrado = document.getElementById("btnNaoCadastrado");
const divCadastrado = document.getElementById("clienteCadastrado");
const divNaoCadastrado = document.getElementById("clienteNaoCadastrado");
const btnBuscar = document.getElementById("buscarCliente");
const dadosClienteDiv = document.getElementById("dadosCliente");
const formPedido = document.getElementById("formPedido");
const listaPedidos = document.getElementById("listaPedidos");
<<<<<<< HEAD

let modoCadastrado = true;

btnCadastrado.addEventListener("click", () => {
  modoCadastrado = true;
  divCadastrado.style.display = "block";
  divNaoCadastrado.style.display = "none";
});

btnNaoCadastrado.addEventListener("click", () => {
  modoCadastrado = false;
  divCadastrado.style.display = "none";
  divNaoCadastrado.style.display = "block";
});

btnBuscar.addEventListener("click", () => {
  const cpf = document.getElementById("cpfBusca").value.trim();
  const cliente = clientes.find(c => c.cpf === cpf);
  dadosClienteDiv.textContent = cliente
    ? `Cliente: ${cliente.nome}, Endereço: ${cliente.end}, Tel: ${cliente.tel}`
    : "Cliente não encontrado!";
});

formPedido.addEventListener("submit", e => {
  e.preventDefault();

  let clienteInfo = "";

  if (modoCadastrado) {
    const cpf = document.getElementById("cpfBusca").value.trim();
    const cliente = clientes.find(c => c.cpf === cpf);
    if (!cliente) return alert("CPF não encontrado!");
    clienteInfo = `${cliente.nome} - ${cliente.end} - ${cliente.tel}`;
  } else {
    const nome = nomePedido.value;
    const end = enderecoPedido.value;
    const tel = telefonePedido.value;
    clienteInfo = `${nome} - ${end} - ${tel}`;
  }

  const pizza = pizzaPedido.value;
  const bebida = bebidaPedido.value;
  const adicional = adicionalPedido.value;

  const pedido = document.createElement("li");
  pedido.innerHTML = `
    <strong>${clienteInfo}</strong><br>
    🍕 ${pizza} | 🥤 ${bebida || "-"} | ➕ ${adicional || "-"}
  `;
  listaPedidos.appendChild(pedido);
  formPedido.reset();
  dadosClienteDiv.textContent = "";
});
=======
const totalPedidoSpan = document.getElementById("totalPedido");

let modoCadastrado = true;
window.pedidosEmAndamento = [];

// garante que botões não submetam formulários
if (btnCadastrado) btnCadastrado.type = "button";
if (btnNaoCadastrado) btnNaoCadastrado.type = "button";
if (btnBuscar) btnBuscar.type = "button";

// função pra aplicar UI de acordo com modo
function aplicarModoCliente() {
  if (modoCadastrado) {
    divCadastrado.style.display = "block";
    divNaoCadastrado.style.display = "none";
    btnCadastrado.classList.add('active');
    btnNaoCadastrado.classList.remove('active');
  } else {
    divCadastrado.style.display = "none";
    divNaoCadastrado.style.display = "block";
    btnCadastrado.classList.remove('active');
    btnNaoCadastrado.classList.add('active');
  }
}

// listeners dos botões
if (btnCadastrado) {
  btnCadastrado.addEventListener("click", () => {
    modoCadastrado = true;
    aplicarModoCliente();
  });
}
if (btnNaoCadastrado) {
  btnNaoCadastrado.addEventListener("click", () => {
    modoCadastrado = false;
    aplicarModoCliente();
  });
}

// busca cliente por CPF
if (btnBuscar) {
  btnBuscar.addEventListener("click", () => {
    const cpf = document.getElementById("cpfBusca").value.trim();
    const cliente = window.clientes ? window.clientes.find(c => c.cpf === cpf) : null;
    dadosClienteDiv.textContent = cliente
      ? `Cliente: ${cliente.nome}, Endereço: ${cliente.end}, Tel: ${cliente.tel}`
      : "Cliente não encontrado!";
  });
}

// carrega pedidos em andamento
function carregarPedidosEmAndamento() {
  window.pedidosEmAndamento = JSON.parse(localStorage.getItem('pedidosEmAndamento') || '[]');
  renderizarPedidosEmAndamento();
}

// salva pedidos em andamento
function salvarPedidosEmAndamento() {
  localStorage.setItem('pedidosEmAndamento', JSON.stringify(window.pedidosEmAndamento));
}

// calcula total (ajusta também o span)
function calcularTotal() {
  const pizzaIdx = document.getElementById('pizzaPedido')?.value;
  const bebidaIdx = document.getElementById('bebidaPedido')?.value;
  const adicionaisSel = Array.from(document.getElementById('adicionalPedido')?.selectedOptions || []).map(o => o.value);

  let total = 0;
  if (pizzaIdx !== '' && pizzaIdx !== undefined && window.pizzas && window.pizzas[pizzaIdx]) total += Number(window.pizzas[pizzaIdx].valor || 0);
  if (bebidaIdx !== '' && bebidaIdx !== undefined && window.bebidas && window.bebidas[bebidaIdx]) total += Number(window.bebidas[bebidaIdx].valor || 0);
  adicionaisSel.forEach(i => {
    if (window.adicionais && window.adicionais[i]) total += Number(window.adicionais[i].valor || 0);
  });

  if (totalPedidoSpan) totalPedidoSpan.textContent = total.toFixed(2);
}

// liga change nos selects para recalcular total
['pizzaPedido','bebidaPedido','adicionalPedido'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', calcularTotal);
});

// submit do pedido
if (formPedido) {
  formPedido.addEventListener("submit", e => {
    e.preventDefault();

    let clienteInfo = "";

    if (modoCadastrado) {
      const cpf = document.getElementById("cpfBusca").value.trim();
      const cliente = window.clientes ? window.clientes.find(c => c.cpf === cpf) : null;
      if (!cliente) {
        toast("CPF não encontrado!");
        return;
      }
      clienteInfo = `${cliente.nome} - ${cliente.end} - ${cliente.tel}`;
    } else {
      const nome = document.getElementById('nomePedido').value.trim();
      const end = document.getElementById('enderecoPedido').value.trim();
      const tel = document.getElementById('telefonePedido').value.trim();
      if (!nome || !end) {
        toast('Nome e endereço do cliente são obrigatórios');
        return;
      }
      clienteInfo = `${nome} - ${end} - ${tel}`;
    }

    const pizzaIndex = document.getElementById('pizzaPedido').value;
    const pizzaObj = (pizzaIndex === '') ? null : window.pizzas[Number(pizzaIndex)];
    const pizza = pizzaObj ? `${pizzaObj.sabor} - R$ ${Number(pizzaObj.valor).toFixed(2)}` : '-';

    const bebidaIndex = document.getElementById('bebidaPedido').value;
    const bebidaObj = (bebidaIndex === '') ? null : window.bebidas[Number(bebidaIndex)];
    const bebida = bebidaObj ? `${bebidaObj.nome} - R$ ${Number(bebidaObj.valor).toFixed(2)}` : '-';

    const adicionaisSelIdx = Array.from(document.getElementById('adicionalPedido').selectedOptions).map(o => Number(o.value));
    const adicionaisObjs = adicionaisSelIdx.map(i => window.adicionais[i]).filter(Boolean);
    const adicionaisText = adicionaisObjs.map(a => `${a.nome} - R$ ${Number(a.valor).toFixed(2)}`).join(', ') || '-';

    const hora = new Date().toLocaleTimeString();
    // calcula total (ler do span pra consistência)
    const total = parseFloat(totalPedidoSpan ? totalPedidoSpan.textContent : '0') || 0;

    const pedidoRegistro = {
      cliente: clienteInfo,
      pizza,
      bebida,
      adicionais: adicionaisText,
      total,
      hora
    };

    // salva em andamento
    window.pedidosEmAndamento.push(pedidoRegistro);
    salvarPedidosEmAndamento();
    renderizarPedidosEmAndamento();

    // adiciona ao histórico (se função disponível)
    if (typeof adicionarHistorico === 'function') {
      adicionarHistorico({
        cliente: pedidoRegistro.cliente,
        pizza: pedidoRegistro.pizza,
        bebida: pedidoRegistro.bebida,
        adicional: pedidoRegistro.adicionais,
        hora: pedidoRegistro.hora,
        total: pedidoRegistro.total
      });
    }

    formPedido.reset();
    dadosClienteDiv.textContent = "";
    if (typeof atualizarSelectsCardapio === 'function') atualizarSelectsCardapio();
    if (totalPedidoSpan) totalPedidoSpan.textContent = '0.00';
    toast('Pedido registrado');
  });
}

function renderizarPedidosEmAndamento() {
  if (!listaPedidos) return;
  listaPedidos.innerHTML = "";
  window.pedidosEmAndamento.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'pedido-card';
    div.innerHTML = `
      <strong>${p.cliente}</strong><br>
      🍕 ${p.pizza} | 🥤 ${p.bebida || '-'}<br>
      ➕ ${p.adicionais || '-'}<br>
      💰 <strong>R$ ${Number(p.total).toFixed(2)}</strong><br>
      <small>${p.hora}</small>
    `;
    const btnPronto = document.createElement('button');
    btnPronto.textContent = 'Concluir';
    btnPronto.type = 'button';
    btnPronto.style.marginTop = '8px';
    btnPronto.addEventListener('click', () => {
      if (confirm('Marcar pedido como concluído?')) {
        window.pedidosEmAndamento.splice(idx, 1);
        salvarPedidosEmAndamento();
        renderizarPedidosEmAndamento();
        toast('Pedido concluído');
      }
    });
    div.appendChild(btnPronto);
    listaPedidos.appendChild(div);
  });
}

window.carregarPedidosEmAndamento = carregarPedidosEmAndamento;
>>>>>>> a344b54 (primeiras alteraçoes)
