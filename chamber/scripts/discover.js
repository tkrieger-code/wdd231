import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    renderPlaces();
    handleVisitMessage();
});

// 1. Renderiza os 8 cards com atribuição dinâmica de grid-area (area1, area2... area8)
function renderPlaces() {
    const container = document.getElementById("places-container");
    if (!container) return;

    container.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        
        // Define a propriedade CSS de grid-area correspondente (area1 a area8)
        card.style.gridArea = `area${index + 1}`;

        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img src="${place.image}" alt="${place.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="card-btn">Saiba mais</button>
        `;

        container.appendChild(card);
    });
}

// 2. Lógica do localStorage para mensagens de visita
function handleVisitMessage() {
    const banner = document.getElementById("visit-message");
    if (!banner) return;

    const msInDay = 86400000; // 1000ms * 60s * 60m * 24h
    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();

    if (!lastVisit) {
        banner.textContent = "Bem-vindo! Entre em contato caso tenha alguma dúvida.";
    } else {
        const timeDiff = now - parseInt(lastVisit, 10);
        const daysDiff = Math.floor(timeDiff / msInDay);

        if (daysDiff < 1) {
            banner.textContent = "Voltei tão rápido! Incrível!";
        } else {
            const dayWord = daysDiff === 1 ? "dia" : "dias";
            banner.textContent = `Sua última visita foi há ${daysDiff} ${dayWord}.`;
        }
    }

    // Salva o acesso atual em milissegundos
    localStorage.setItem("lastVisitDate", now.toString());
}