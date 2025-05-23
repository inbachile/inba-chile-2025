const filas = "ABCDEFGHIJK".split(""); // A a K como filas (vertical)
const columnas = 21; // 21 a 1 como columnas (horizontal)
const sala = document.getElementById("sala");
const encabezado = document.getElementById("encabezado");
const seleccionados = new Set();
const seleccionadosDiv = document.getElementById("seleccionados");
const ocupados = []; // Ejemplo: ["A1", "C2"]

// Crear encabezado con números 21 al 1
for (let i = 21; i <= columnas; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = "letra";
    numDiv.textContent = i;
    encabezado.appendChild(numDiv);
}

// Crear cada fila (A-K)
filas.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.className = "fila";

    for (let col = 21; col <= columnas; col++) {
        const id = fila + col;
        const seat = document.createElement("div");
        seat.className = "asiento";
        seat.textContent = id;

        if (["A", "B", "C"].includes(fila)) seat.classList.add("vip");
        if (ocupados.includes(id)) {
            seat.classList.add("ocupado");
        } else {
            seat.onclick = () => {
                if (seat.classList.contains("ocupado")) return;
                if (seleccionados.has(id)) {
                    seleccionados.delete(id);
                    seat.style.backgroundColor = seat.classList.contains("vip") ? "gold" : "green";
                } else {
                    seleccionados.add(id);
                    seat.style.backgroundColor = "orange";
                }
                actualizarSeleccion();
            };
        }

        filaDiv.appendChild(seat);
    }

    sala.appendChild(filaDiv);
});

function actualizarSeleccion() {
    const lista = Array.from(seleccionados).sort().join(", ");
    seleccionadosDiv.textContent = lista
        ? "Asientos seleccionados: " + lista
        : "Asientos seleccionados: ninguno";
}

function enviarReserva() {
    if (seleccionados.size === 0) {
        alert("Debes seleccionar al menos un asiento.");
        return;
    }
    const lista = Array.from(seleccionados).sort().join(", ");
    const mensaje = `Hola, quiero reservar los siguientes asientos para el evento INBA Chile 2025: ${lista}. Por favor confirmar.`;
    const url = "https://wa.me/56961451122?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}
