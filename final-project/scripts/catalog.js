import { getProductsData } from './fetch.js';
import { openProductModal, getSavedItems, toggleSaveItem } from './modal.js';

let allProducts = []; // Guarda a lista completa em memória

// Elementos do DOM
const catalogGrid = document.querySelector('#full-catalog-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const savedCounter = document.querySelector('#saved-count');

/**
 * Renderiza os cards dinamicamente no DOM usando Template Literals e forEach
 */
function displayProducts(productsList) {
  if (!catalogGrid) return;
  catalogGrid.innerHTML = ''; // Limpa a grade antes de renderizar

  const savedIds = getSavedItems();

  // Exigência: Usa o método de Array forEach para percorrer e criar os cards
  productsList.forEach(product => {
    const isSaved = savedIds.includes(product.id);
    const card = document.createElement('article');
    card.className = 'card';

    // Construção do HTML com Template Literals (exibindo mais de 4 propriedades do item)
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="card-body">
        <span class="card-tag">${product.technique}</span>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-text">${product.paperWeight} • ${product.pageCount} pages</p>
        <div style="display: flex; gap: 8px; margin-top: auto;">
          <button class="btn-primary view-details-btn" data-id="${product.id}">Details</button>
          <button class="btn-secondary save-btn ${isSaved ? 'saved' : ''}" data-id="${product.id}">
            ${isSaved ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    `;

    catalogGrid.appendChild(card);
  });

  // Atribui os ouvintes de eventos (Event Listeners) aos novos botões criados
  attachCardEvents();
}

/**
 * Associa ouvintes de eventos de clique aos botões dentro dos cards
 */
function attachCardEvents() {
  // Botão de abrir detalhes no modal
  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const selectedProduct = allProducts.find(p => p.id === id);
      if (selectedProduct) openProductModal(selectedProduct);
    });
  });

  // Botão de favoritar/salvar no LocalStorage
  document.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const updatedSaved = toggleSaveItem(id);
      
      // Atualiza o contador de salvos na tela
      updateSavedCounter(updatedSaved.length);
      
      // Re-renderiza para atualizar a aparência do botão
      const currentCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
      filterCategory(currentCategory);
    });
  });
}

/**
 * Filtra produtos por categoria utilizando o método de Array filter()
 */
function filterCategory(category) {
  if (category === 'all') {
    displayProducts(allProducts);
  } else {
    // Exigência: Método de Array filter
    const filtered = allProducts.filter(item => item.category === category);
    displayProducts(filtered);
  }
}

/**
 * Atualiza o contador de itens salvos no topo do catálogo
 */
function updateSavedCounter(count) {
  if (savedCounter) savedCounter.textContent = count;
}

// Configuração dos filtros de categoria
filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const category = e.target.getAttribute('data-category');
    filterCategory(category);
  });
});

// Inicialização ao carregar o DOM
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Busca os dados via Fetch
  allProducts = await getProductsData('data/products.json');
  
  // 2. Renderiza todos os produtos inicialmente
  displayProducts(allProducts);

  // 3. Carrega e exibe a quantidade de itens salvos no localStorage
  updateSavedCounter(getSavedItems().length);
});