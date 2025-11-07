<<<<<<< HEAD
const listaHistorico = document.getElementById("listaHistorico");
=======
// historico.js
const listaHistorico = document.getElementById("listaHistorico");
window.historico = [];

function salvarHistorico() {
  localStorage.setItem("historico", JSON.stringify(window.historico));
}

function carregarHistorico() {
  window.historico = JSON.parse(localStorage.getItem("historico") || "[]");
  atualizarHistorico();
}

function atualizarHistorico() {
  if (!listaHistorico) return;
  listaHistorico.innerHTML = "";
  window.historico.forEach(h => {
    const li = document.createElement('li');
    li.textContent = `${h.hora} - ${h.cliente} - ${h.pizza} - ${h.bebida || '-'} - ${h.adicional || '-'}`;
    listaHistorico.appendChild(li);
  });
}

function adicionarHistorico(registro) {
  window.historico.push(registro);
  salvarHistorico();
  atualizarHistorico();
}

function exportarHistoricoCSV() {
  if (!window.historico.length) {
    toast('Historico vazio');
    return;
  }
  const header = ['hora', 'cliente', 'pizza', 'bebida', 'adicional'];
  const rows = window.historico.map(h => [h.hora, `"${h.cliente}"`, `"${h.pizza}"`, `"${h.bebida||''}"`, `"${h.adicional||''}"`].join(','));
  const csv = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `historico_pedidos_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function limparHistorico() {
  window.historico = [];
  salvarHistorico();
  atualizarHistorico();
}

window.carregarHistorico = carregarHistorico;
window.adicionarHistorico = adicionarHistorico;
window.exportarHistoricoCSV = exportarHistoricoCSV;
window.limparHistorico = limparHistorico;
>>>>>>> a344b54 (primeiras alteraçoes)
