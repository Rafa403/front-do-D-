const formPizza = document.getElementById("formPizza");
const listaPizzas = document.getElementById("listaPizzas");

formPizza.addEventListener("submit", e => {
  e.preventDefault();
  const sabor = saborPizza.value;
  const valor = valorPizza.value;
  const li = document.createElement("li");
  li.textContent = `${sabor} - R$ ${parseFloat(valor).toFixed(2)}`;
  listaPizzas.appendChild(li);
  formPizza.reset();
});
