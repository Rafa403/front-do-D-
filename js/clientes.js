// clientes.js — versão limpa e funcional

const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
window.clientes = [];

// ======== Funções de salvar/carregar ========
function salvarClientes() {
  localStorage.setItem("clientes", JSON.stringify(window.clientes));
}

function carregarClientes() {
  window.clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  atualizarClientes();
}

// ======== Cadastro de cliente ========
formCliente.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nomeCliente").value.trim();
  const cpf = document.getElementById("cpfCliente").value.trim();
  const tel = document.getElementById("telefoneCliente").value.trim();
  const end = document.getElementById("enderecoCliente").value.trim();

  if (!nome || !cpf) {
    alert("Nome e CPF são obrigatórios.");
    return;
  }

  // Verificar se CPF já existe
  if (window.clientes.some(c => c.cpf === cpf)) {
    alert("CPF já cadastrado!");
    return;
  }

  window.clientes.push({ nome, cpf, tel, end });
  salvarClientes();
  atualizarClientes();
  formCliente.reset();
  alert("Cliente cadastrado com sucesso!");
});

// ======== Atualiza lista de clientes ========
function atualizarClientes() {
  listaClientes.innerHTML = "";
  window.clientes.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.nome} - CPF: ${c.cpf} - Tel: ${c.tel} - End: ${c.end}`;
    listaClientes.appendChild(li);
  });
}

// ======== Inicialização ========
carregarClientes();
