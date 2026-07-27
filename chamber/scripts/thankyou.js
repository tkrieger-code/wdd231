/* ==========================================================================
   WDD231 - THANK YOU PAGE SCRIPT (URL Parameters Parser)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const resultsContainer = document.getElementById("results");

    if (!resultsContainer) return;

    // Extrai a Query String
    const formData = currentUrl.split("?");
    
    if (formData.length > 1) {
        const params = new URLSearchParams(formData[1]);

        // Função utilitária para extrair com segurança ou dar um valor padrão
        const getParam = (key) => params.get(key) || "N/A";

        // Formata a data recebida no timestamp
        let formattedDate = getParam("timestamp");
        if (formattedDate !== "N/A") {
            try {
                formattedDate = new Date(formattedDate).toLocaleString("pt-BR", {
                    dateStyle: "full",
                    timeStyle: "medium"
                });
            } catch (e) {
                // Mantém a string original caso haja falha de parse
            }
        }

        resultsContainer.innerHTML = `
            <ul class="info-list">
                <li><strong>First Name:</strong> ${getParam("fname")}</li>
                <li><strong>Last Name:</strong> ${getParam("lname")}</li>
                <li><strong>Email:</strong> ${getParam("email")}</li>
                <li><strong>Mobile Phone:</strong> ${getParam("phone")}</li>
                <li><strong>Business Name:</strong> ${getParam("organization")}</li>
                <li><strong>Date/Time Submitted:</strong> ${formattedDate}</li>
            </ul>
        `;
    } else {
        resultsContainer.innerHTML = `<p>No application details were found. Please fill out the form on the Join page.</p>`;
    }
});