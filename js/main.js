<<<<<<< HEAD
=======
// main.js -> navegação, toasts e inicialização
>>>>>>> a344b54 (primeiras alteraçoes)
const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll(".content");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    link.classList.add("active");
    document.getElementById(link.dataset.section).classList.add("active");
  });
});
<<<<<<< HEAD
=======

// Função toast global
function toast(msg) {
  const div = document.createElement('div');
  div.className = 'toast';
  div.textContent = msg;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
window.toast = toast; // expor globalmente

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  // inicializa dados carregando de cada módulo
  if (typeof carregarClientes === 'function') carregarClientes();
  if (typeof carregarCardapio === 'function') carregarCardapio();
  if (typeof carregarEstoque === 'function') carregarEstoque();
  if (typeof carregarHistorico === 'function') carregarHistorico();
  if (typeof carregarPedidosEmAndamento === 'function') carregarPedidosEmAndamento();

  // atualizar selects (caso cardápio já carregado)
  if (typeof atualizarSelectsCardapio === 'function') atualizarSelectsCardapio();

  // export CSV botão (historico)
  const exportBtn = document.getElementById('exportCsv');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (typeof exportarHistoricoCSV === 'function') exportarHistoricoCSV();
    });
  }

  const limparHistBtn = document.getElementById('limparHistorico');
  if (limparHistBtn) {
    limparHistBtn.addEventListener('click', () => {
      if (typeof limparHistorico === 'function') {
        if (confirm('Deseja realmente limpar o histórico do dia?')) {
          limparHistorico();
          toast('Histórico limpo');
        }
      }
    });
  }
});
>>>>>>> a344b54 (primeiras alteraçoes)
