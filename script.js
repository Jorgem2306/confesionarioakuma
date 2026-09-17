const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQjGWpp-9BT1mAkE0JDPJVegcCz4T6pQdPeIWnqIjh5W3b_1uY8Mj9T644XO4LKjNrbA/exec";

// Auto-resize textarea
const textareaAuto = document.getElementById("mensaje");
textareaAuto.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

// Enviar confesión
document.getElementById("formConfesion").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("btn");
    const textarea = document.getElementById("mensaje");
    const msjExito = document.getElementById("mensajeExito");

    btn.disabled = true;
    textarea.disabled = true;
    btn.textContent = "Enviando...";
    msjExito.style.display = "none";

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: textarea.value })
        });
        textarea.value = "";
        textarea.style.height = "auto";
        msjExito.style.display = "block";
        setTimeout(() => { msjExito.style.display = "none"; }, 5000);
    } catch (err) {
        alert("Error al enviar. La red de la purga falló.");
    } finally {
        btn.disabled = false;
        textarea.disabled = false;
        btn.textContent = "Enviar Confesión";
    }
});

// Remover overlay de introducción después de la animación
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("intro-overlay");
    if (overlay) {
        setTimeout(() => {
            overlay.remove();
        }, 4000); // Se elimina tras 4 segundos (cuando termina la animación)
    }
});
