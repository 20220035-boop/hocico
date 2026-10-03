// Productos (puedes editar nombres, precios y recetas)
const productos = [
  { nombre: "Pollo y Camote", etapa: "cachorro", emoji: "🍗", precio: 48, desc: "Rico en proteína para crecer fuerte." },
  { nombre: "Salmón y Arroz", etapa: "cachorro", emoji: "🐟", precio: 55, desc: "Omega 3 para el pelo y el cerebro." },
  { nombre: "Res y Zanahoria", etapa: "adulto", emoji: "🥩", precio: 52, desc: "Receta diaria para perros activos." },
  { nombre: "Pollo y Calabaza", etapa: "adulto", emoji: "🍗", precio: 50, desc: "Fácil de digerir, ideal todos los días." },
  { nombre: "Pavo y Avena", etapa: "senior", emoji: "🦃", precio: 54, desc: "Menos grasa, cuida las articulaciones." },
  { nombre: "Pescado y Papa", etapa: "senior", emoji: "🐟", precio: 56, desc: "Suave para estómagos delicados." }
];

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
let pedido = 0;

function mostrarProductos(filtro) {
  const lista = filtro === "todos" ? productos : productos.filter(p => p.etapa === filtro);
  grid.innerHTML = lista.map(p => `
    <article class="card">
      <span class="emoji" aria-hidden="true">${p.emoji}</span>
      <span class="tag">${p.etapa}</span>
      <h3>${p.nombre}</h3>
      <p>${p.desc}</p>
      <p class="price">S/ ${p.precio} · bolsa 3 kg</p>
      <button data-nombre="${p.nombre}">Agregar al pedido</button>
    </article>
  `).join("");
}

// Filtros
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelector(".chip.active").classList.remove("active");
    chip.classList.add("active");
    mostrarProductos(chip.dataset.filter);
  });
});

// Agregar al pedido
grid.addEventListener("click", e => {
  if (e.target.matches("button[data-nombre]")) {
    pedido++;
    cartCount.textContent = pedido;
    e.target.textContent = "Agregado";
    setTimeout(() => (e.target.textContent = "Agregar al pedido"), 1200);
  }
});

// Calculadora de ración diaria
document.getElementById("calcBtn").addEventListener("click", () => {
  const peso = parseFloat(document.getElementById("peso").value);
  const porcentaje = parseFloat(document.getElementById("etapa").value);
  const salida = document.getElementById("resultado");

  if (!peso || peso <= 0) {
    salida.textContent = "Escribe un peso válido en kilos.";
    return;
  }
  const gramos = Math.round(peso * 1000 * porcentaje);
  salida.textContent = `Unos ${gramos} g al día, repartidos en 2 comidas.`;
});

// Formulario de pedido
document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  document.getElementById("formMsg").textContent =
    `Gracias, ${nombre}. Te contactaremos pronto para confirmar tu pedido.`;
  e.target.reset();
});

// Inicio
document.getElementById("year").textContent = new Date().getFullYear();
mostrarProductos("todos");
