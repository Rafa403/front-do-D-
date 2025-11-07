const formIngrediente = document.getElementById("formIngrediente");
const listaEstoque = document.getElementById("listaEstoque");

formIngrediente.addEventListener("submit", e => {
  e.preventDefault();
  const nome = nomeIngrediente.value;
  const qtd = qtdIngrediente.value;
  const li = document.createElement("li");
  li.textContent = `${nome}: ${qtd} unidades`;
  listaEstoque.appendChild(li);
  formIngrediente.reset();
});
