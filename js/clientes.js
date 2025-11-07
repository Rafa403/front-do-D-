<<<<<<< HEAD
=======
// clientes.js
>>>>>>> a344b54 (primeiras alteraçoes)
const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
window.clientes = [];

<<<<<<< HEAD
formCliente.addEventListener("submit", e => {
  e.preventDefault();
  const nome = nomeCliente.value;
  const cpf = cpfCliente.value;
  const tel = telefoneCliente.value;
  const end = enderecoCliente.value;

  clientes.push({ nome, cpf, tel, end });
  atualizarClientes();
  formCliente.reset();
=======
function salvarClientes() {
  localStorage.setItem("clientes", JSON.stringify(window.clientes));
}

function carregarClientes() {
  window.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  atualizarClientes();
}

formCliente.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById('nomeCliente').value.trim();
  const cpf = document.getElementById('cpfCliente').value.trim();
  const tel = document.getElementById('telefoneCliente').value.trim();
  const end = document.getElementById('enderecoCliente').value.trim();

  if (!nome || !cpf) {
    toast('Nome e CPF são obrigatórios');
    return;
  }

  // checar cpf duplicado
  if (window.clientes.some(c => c.cpf === cpf)) {
    toast('CPF já cadastrado');
    return;
  }

  window.clientes.push({ nome, cpf, tel, end });
  salvarClientes();
  atualizarClientes();
  formCliente.reset();
  toast('Cliente cadastrado');
>>>>>>> a344b54 (primeiras alteraçoes)
});

function atualizarClientes() {
  listaClientes.innerHTML = "";
<<<<<<< HEAD
  clientes.forEach(c => {
=======
  window.clientes.forEach(c => {
>>>>>>> a344b54 (primeiras alteraçoes)
    const li = document.createElement("li");
    li.textContent = `${c.nome} - CPF: ${c.cpf} - Tel: ${c.tel} - End: ${c.end}`;
    listaClientes.appendChild(li);
  });
}
