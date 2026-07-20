// 1. Selecionar os elementos HTML que serão manipulados
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// 2. Coordenadas de Trier, Alemanha e URL da API
const lat = "49.75";
const lon = "6.64";
const myKey = "d32e975e391c58a936c7e2bc149c0f65"; // <-- Cole sua chave da API aqui

// Construção da URL conforme as regras da documentação
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}`;

// 3. Função assíncrona para buscar os dados da API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Exibe os dados no console para testes
      displayResults(data); // Chama a função para renderizar na tela
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

// 4. Função para exibir os resultados preenchendo as lacunas
function displayResults(data) {
  // Preenche a temperatura atual (arredondada usando toFixed se quiser, ou direto)
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
  
  // Monta o caminho do ícone correspondente usando o código retornado pela API
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
  // Captura a descrição do clima (ex: "clear sky")
  let desc = data.weather[0].description;
  
  // Modifica os atributos da imagem do ícone
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  
  // Modifica o texto da legenda formatando a primeira letra para maiúscula
  captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

// 5. Invocação da função para executar o script
apiFetch();