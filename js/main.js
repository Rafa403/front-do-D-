// main.js — navegação, toasts e inicialização global

const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll(".content");

links.forEach(link => {

  // Não intercepta o botão da cozinha
  if (link.classList.contains("cozinha-link")) return;

  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    link.classList.add("active");
    document.getElementById(link.dataset.section).classList.add("active");
  });
});

function toast(msg) {
  const div = document.createElement("div");
  div.className = "toast";
  div.textContent = msg;
  Object.assign(div.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "var(--cor-primaria)",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    zIndex: "9999",
    fontWeight: "bold",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    opacity: "0",
    transition: "opacity 0.3s",
  });
  document.body.appendChild(div);
  setTimeout(() => (div.style.opacity = "1"), 100);
  setTimeout(() => {
    div.style.opacity = "0";
    setTimeout(() => div.remove(), 300);
  }, 3000);
}
window.toast = toast;


document.addEventListener("DOMContentLoaded", () => {

  if (typeof carregarClientes === "function") carregarClientes();
  if (typeof carregarCardapio === "function") carregarCardapio();
  if (typeof carregarEstoque === "function") carregarEstoque();
  if (typeof carregarHistorico === "function") carregarHistorico();
  if (typeof carregarPedidosEmAndamento === "function") carregarPedidosEmAndamento();

  if (typeof atualizarSelectsCardapio === "function") atualizarSelectsCardapio();

  const exportBtn = document.getElementById("exportCsv");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      if (typeof exportarHistoricoCSV === "function") exportarHistoricoCSV();
    });
  }

  const limparHistBtn = document.getElementById("limparHistorico");
  if (limparHistBtn) {
    limparHistBtn.addEventListener("click", () => {
      if (typeof limparHistorico === "function") {
        if (confirm("Deseja realmente limpar o histórico do dia?")) {
          limparHistorico();
          toast("Histórico limpo!");
        }
      }
    });
  }
});
