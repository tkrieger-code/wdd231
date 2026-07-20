const dataUrl = "data/members.json";
const container = document.querySelector(".directory-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

// função assíncrona para buscar dados de membros
async function getMembers() {
    try{
        const response = await fetch(dataUrl);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Error loading the JSON file:", response.statusText);
        }
    } catch (error) {
        console.error("Error in fetch request:", error);
    }
}

// função para criar e exibir os cartões dinamicamente
function displayMembers(members) {
    container.innerHTML = ""; // limpa o container antes de renderizar

    members.forEach((member) => {
        // cria o elemento estrutural do cartão
        const card = document.createElement("section");
        card.classList.add("business-card");

        // traduz o nível de associação
        let membershipText = "Member";
        if (member.membershipLevel === 2) membershipText = "Silver";
        if (member.membershipLevel === 3) membershipText = "Gold";

        // injeta o template HTML com os dados do JSON
        card.innerHTML = `
        <h2>${member.name}</h2>
        <p class="tagline"><em>${member.tagline}</em></p>
        <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" width="150" height="100">
        <p><strong>EMAIL:</strong> info@gmail.com</p> <p><strong>PHONE:</strong> ${member.phone}</p>
        <p><strong>LEVEL:</strong> ${membershipText}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        container.appendChild(card);
    });
}

// grid vs list
// Ações para o botão de Grade (Grid)
// Segurança: código dentro do 'if' só roda se os botões realmente existirem na página atual
if (gridBtn && listBtn && container) {
    // Ações para o botão de Grade (Grid)
    gridBtn.addEventListener("click", () => {
        container.classList.add("grid");
        container.classList.remove("list");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    // Ações para o botão de Lista (List)
    listBtn.addEventListener("click", () => {
        container.classList.add("list");
        container.classList.remove("grid");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}


// inicializa a chamada da API ao carregar a pg
// Só busca e renderiza os membros se o contêiner do diretório existir na página
if (container) {
    getMembers();
}

// --- Rodapé e Menu Hamburguer ---
const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

const lastModParagraph = document.getElementById("lastModified");
if (lastModParagraph) lastModParagraph.textContent = `Last Modification: ${document.lastModified}`;

const hamBtn = document.querySelector(".hamburguer");
const navBar = document.querySelector(".navigation");

if (hamBtn && navBar) {
    hamBtn.addEventListener("click", () => {
        navBar.classList.toggle("show");
        hamBtn.classList.toggle("show");
    });
}