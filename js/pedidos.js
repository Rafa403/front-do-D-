const btnCadastrado = document.getElementById("btnCadastrado");
const btnNaoCadastrado = document.getElementById("btnNaoCadastrado");
const divCadastrado = document.getElementById("clienteCadastrado");
const divNaoCadastrado = document.getElementById("clienteNaoCadastrado");
const btnBuscar = document.getElementById("buscarCliente");
const dadosClienteDiv = document.getElementById("dadosCliente");
const formPedido = document.getElementById("formPedido");
const listaPedidos = document.getElementById("listaPedidos");

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
