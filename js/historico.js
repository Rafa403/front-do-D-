// historico.js — versão limpa e funcional

const listaHistorico = document.getElementById("listaHistorico");
window.historico = [];

// ======== Funções de salvar e carregar ========
function salvarHistorico() {
  localStorage.setItem("historico", JSON.stringify(window.historico));
}

function carregarHistorico() {
  window.historico = JSON.parse(localStorage.getItem("historico") || "[]");
  atualizarHistorico();
}

// ======== Atualizar exibição ========
function atualizarHistorico() {
  if (!listaHistorico) return;
  listaHistorico.innerHTML = "";
  window.historico.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.hora} - ${h.cliente} - ${h.pizza} - ${h.bebida || "-"} - ${h.adicional || "-"}`;
    listaHistorico.appendChild(li);
  });
}

// ======== Adicionar novo registro ========
function adicionarHistorico(registro) {
  window.historico.push(registro);
  salvarHistorico();
  atualizarHistorico();
}

// ======== Exportar para CSV ========
function exportarHistoricoCSV() {
  if (!window.historico.length) {
    alert("Histórico vazio!");
    return;
  }

  const header = ["hora", "cliente", "pizza", "bebida", "adicional"];
  const rows = window.historico.map(h =>
    [h.hora, `"${h.cliente}"`, `"${h.pizza}"`, `"${h.bebida || ""}"`, `"${h.adicional || ""}"`].join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `historico_pedidos_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ======== Limpar histórico ========
function limparHistorico() {
  if (!confirm("Deseja realmente limpar o histórico?")) return;
  window.historico = [];
  salvarHistorico();
  atualizarHistorico();
}

// ======== Inicialização ========
window.carregarHistorico = carregarHistorico;
window.adicionarHistorico = adicionarHistorico;
window.exportarHistoricoCSV = exportarHistoricoCSV;
window.limparHistorico = limparHistorico;

carregarHistorico();
