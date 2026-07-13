// variáveis globais
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards'); // seleciona a <div id="cards">

//função para exibir os cartões na tela
const displayProphets = (prophets) => {
    // forEach roda uma vez para cada profeta
    prophets.forEach((prophet) => {
        // cria os elementos HTML na memória do JavaScript
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let birthDate = document.createElement("p")
        let birthPlace = document.createElement("p")
        let portrait = document.createElement("img");
        
        // preenche o h2 usando template strings
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Preenche as informações com os dados do arquivo JSON
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // configura os atributos da imagem usando setAttribute
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy"); // melhora a performance de carregamento
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        // coloca o h2 e o img dentro da <section> (card)
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // coloca o card completo dentro da <div id="cards">
        cards.appendChild(card);
    });
}

// função assíncrona para buscar os dados
async function getProphetData() {
  const response = await fetch(url); // espera a resposta da rede
  const data = await response.json(); // transforma a resposta em JSON

  //console.table(data.prophets); linha de teste
  displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
}

// executa a função principal para iniciar o fluxo
getProphetData();