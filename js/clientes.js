const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
window.clientes = [];

formCliente.addEventListener("submit", e => {
  e.preventDefault();
  const nome = nomeCliente.value;
  const cpf = cpfCliente.value;
  const tel = telefoneCliente.value;
  const end = enderecoCliente.value;

  clientes.push({ nome, cpf, tel, end });
  atualizarClientes();
  formCliente.reset();
});

function atualizarClientes() {
  listaClientes.innerHTML = "";
  clientes.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.nome} - CPF: ${c.cpf} - Tel: ${c.tel} - End: ${c.end}`;
    listaClientes.appendChild(li);
  });
}
