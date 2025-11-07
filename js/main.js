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
