/* ==========================================================================
   WDD231 - CHAMBER OF COMMERCE: HOME JAVASCRIPT (Weather & Spotlights)
   ========================================================================== */

// 1. CONFIGURAÇÕES DAS APIs
const apiKey = 'cd6e1ce527305d4c4690b89716337ef2'; // chave do OpenWeatherMap
const lat = '-29.9181'; // Latitude de Canoas, RS
const lon = '-51.1781'; // Longitude de Canoas, RS

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${apiKey}`;
const membersUrl = 'data/members.json';

// --- FUNÇÃO DO CLIMA REAL ---
async function fetchWeatherData() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Weather data network response was not ok');
        const data = await response.json();
        
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-current').innerHTML = `<p>Weather data unavailable.</p>`;
    }
}

function displayWeather(data) {
    const currentContainer = document.getElementById('weather-current');
    const forecastContainer = document.getElementById('weather-forecast');
    
    const current = data.list[0];
    
    currentContainer.innerHTML = `
        <p>Current: <strong>${Math.round(current.main.temp)}°C</strong></p>
        <p style="text-transform: capitalize;">${current.weather[0].description}</p>
    `;
    
    forecastContainer.innerHTML = '';
    const forecastIndices = [8, 16, 24];
    
    forecastIndices.forEach(index => {
        const item = data.list[index];
        const date = new Date(item.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${Math.round(item.main.temp)}°C</p>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

// --- FUNÇÃO DOS MEMBROS EM DESTAQUE (SPOTLIGHT) ---
async function fetchSpotlightData() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('Members data network response was not ok');
        const data = await response.json(); // Aqui 'data' já é o próprio Array!
        
        // 🔥 Filtra apenas membros Silver (2) ou Gold (3)
        const eligibleMembers = data.filter(member => 
            member.membershipLevel === 2 || member.membershipLevel === 3
        );
        
        // Embaralha a lista e seleciona de 2 a 3 membros aleatoriamente
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error fetching spotlights:', error);
        document.getElementById('spotlight-container').innerHTML = `<p>Featured companies unavailable.</p>`;
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'business-card'; 
        
        // Converte o número de volta para texto na exibição da página
        const membershipText = member.membershipLevel === 3 ? 'Gold' : 'Silver';
        
        card.innerHTML = `
            <h2>${member.name}</h2>
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="100">
            <p class="tagline">"${member.tagline}"</p>
            <hr>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Membership:</strong> ${membershipText}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// Inicializa as chamadas ao carregar a página
fetchWeatherData();
fetchSpotlightData();