/* ==========================================================================
   WDD231 - JOIN PAGE SCRIPT (Timestamp & Modals)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Grava a data e hora atual no campo oculto #timestamp
    const timestampInput = document.getElementById("timestamp");
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toISOString();
    }

    // 2. Controle dos Modais
    const modalButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Fechar a modal ao clicar fora da área de conteúdo (no backdrop)
    const modals = document.querySelectorAll("dialog");
    modals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            const rect = modal.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    });
});