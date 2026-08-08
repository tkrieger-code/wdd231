// Chave usada para salvar no localStorage
const STORAGE_KEY = 'papel_ponto_wishlist';

/**
 * Lê os IDs salvos no localStorage
 */
export function getSavedItems() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Adiciona ou remove um item do localStorage
 */
export function toggleSaveItem(productId) {
  let savedItems = getSavedItems();
  
  if (savedItems.includes(productId)) {
    // Se já existe, remove (filtra fora)
    savedItems = savedItems.filter(id => id !== productId);
  } else {
    // Se não existe, adiciona
    savedItems.push(productId);
  }

  // Persiste a lista atualizada em texto JSON no navegador
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
  return savedItems;
}

/**
 * Exibe o diálogo modal com os detalhes de um produto específico
 */
export function openProductModal(product) {
  const modal = document.querySelector('#detail-modal');
  const modalBody = document.querySelector('#modal-body');

  if (!modal || !modalBody) return;

  // Monta o HTML do modal usando Template Literals
  modalBody.innerHTML = `
    <h2>${product.name}</h2>
    <p class="card-tag">${product.technique}</p>
    <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:6px; margin: 10px 0;">
    <p><strong>Category:</strong> ${product.category.toUpperCase()}</p>
    <p><strong>Paper Weight:</strong> ${product.paperWeight}</p>
    <p><strong>Page Count:</strong> ${product.pageCount} pages</p>
    <p style="margin-top: 10px;">${product.description}</p>
  `;

  // Utiliza a API nativa HTML5 Dialog para abrir o modal acessível
  modal.showModal();
}

// Configura o evento de fechar o modal
const closeModalBtn = document.querySelector('#close-modal');
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    const modal = document.querySelector('#detail-modal');
    if (modal) modal.close();
  });
}