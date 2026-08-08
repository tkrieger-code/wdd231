// Exportamos uma função para ser reutilizada em qualquer página
export function setupNavigation() {
  const menuToggle = document.querySelector('#menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');

  if (menuToggle && primaryNav) {
    // Escuta o clique no botão hambúrguer
    menuToggle.addEventListener('click', () => {
      // Alterna (liga/desliga) a classe 'open' no CSS
      primaryNav.classList.toggle('open');
    });
  }
}

// Executa automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', setupNavigation);

import { getProductsData } from "./fetch.js";

document.addEventListener('DOMContentLoaded', async () => {
  // Busca os dados JSON
  const products = await getProductsData();

  if (products.length === 0) return;

  // Preenche os destaques (Featured Products)
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = ''; // Limpa o "carregando..."

    // Pega por exemplo os 3 primeiros produtos para exibir como destaque
    const featuredItems = products.slice(0, 3);

    featuredItems.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="300" height="220" loading="lazy">
        <div class="card-body">
          <span class="card-tag">${product.category}</span>
          <h3 class="card-title">${product.name}</h3>
          <p class="card-text">${product.description}</p>
        </div>
      `;
      featuredGrid.appendChild(card);
    });
  }

  // Preenche as Técnicas de Encadernação (Dados Estáticos)
const techniquesGrid = document.getElementById('techniques-grid');
if (techniquesGrid) {
  techniquesGrid.innerHTML = ''; // Limpa o "Carregando..."

  const techniquesData = [
    {
      name: "Coptic Stitch",
      description: "An exposed spine binding style that allows the book to open completely flat.",
      image: "images/technique-coptic.webp"
    },
    {
      name: "Long Stitch",
      description: "Traditional historical binding where stitches run vertically along the spine exterior.",
      image: "images/technique-longstitch.webp"
    },
    {
      name: "Case Binding",
      description: "A classic hardcover bookbinding method providing durability and a clean finish.",
      image: "images/technique-case.webp"
    }
  ];

  techniquesData.forEach(technique => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${technique.image}" alt="${technique.name}" width="300" height="220" loading="lazy">
      <div class="card-body">
        <h3 class="card-title">${technique.name}</h3>
        <p class="card-text">${technique.description}</p>
      </div>
    `;
    techniquesGrid.appendChild(card);
  });
}
});