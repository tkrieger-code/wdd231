/**
 * Busca assíncrona de dados do arquivo JSON local
 * @param {string} url - Caminho para o arquivo JSON
 * @returns {Promise<Array>} Retorna a lista de produtos ou um array vazio em caso de erro
 */
export async function getProductsData(url = 'data/products.json') {
  try {
    // 1. Faz a requisição HTTP assíncrona para o arquivo JSON
    const response = await fetch(url);

    // 2. Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // 3. Converte a resposta recebida em um objeto JavaScript (JSON parsing)
    const data = await response.json();
    return data;

  } catch (error) {
    // Tratamento robusto de erros: captura falhas de rede ou erro no JSON
    console.error("Failed to load products data:", error);
    return []; // Retorna array vazio para evitar quebrar a interface
  }
}