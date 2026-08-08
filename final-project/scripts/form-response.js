document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  // 👉 Adicione esta linha para ver o que a página está recebendo
  console.log("URL atual:", window.location.href);
  console.log("Parâmetros encontrados:", Array.from(params.entries()));
  const responseContainer = document.getElementById('response-details');
  
  if (responseContainer) {
    if (params.toString() === '') {
      responseContainer.innerHTML = '<p>No order details found.</p>';
      return;
    }

    responseContainer.innerHTML = '';
    
    params.forEach((value, key) => {
      const p = document.createElement('p');
      
      // --- LÓGICA DE FORMATAÇÃO AQUI ---
      // 1. Converte tudo para minúsculas: "fullName" -> "fullname", "BINDINGSTYLE" -> "bindingstyle"
      let formattedKey = key.toLowerCase();

      // 2. Formata o texto:
      // - Substitui hifens (-) por espaço: "80g-ruled" -> "80g ruled"
      // - Substitui underscores (_) por espaço: "cover_material" -> "cover material"
      // - Adiciona um espaço antes de cada letra maiúscula (para camelCase): "fullName" -> "full Name"
      formattedKey = formattedKey
        .replace(/[-_]/g, ' ')
        .replace(/([A-Z])/g, ' $1');
        
      // 3. Opcional: Deixa apenas a primeira letra da frase maiúscula: "full name" -> "Full name"
      formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
      // -----------------------------------

      p.innerHTML = `<strong>${formattedKey}:</strong> ${value}`;
      responseContainer.appendChild(p);
    });
  }
});