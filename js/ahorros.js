let ahorros = JSON.parse(localStorage.getItem("ahorros")) || [];
let btnAhorro = document.getElementById("agregarAhorro");
let containerAhorros = document.getElementById("container-card");
let ahorrosMostrar = document.getElementById("ahorros");
let contadorAhorros = document.getElementById("contador-ahorros");

// Agregar un ahorro al local storage y renderizarlo
btnAhorro.addEventListener("click", () => {
    let tipoAhorro = prompt("Ingrese el tipo de ahorro");
    let fecha = new Date().toISOString().split('T')[0]; // Formatear la fecha a 'YYYY-MM-DD'
    let monto = parseFloat(prompt("Ingrese el monto")); // Convertir monto a número

    if (!isNaN(monto)) { // Verificar que monto sea un número válido
        let ahorro = { tipoAhorro: tipoAhorro, fecha: fecha, monto: monto };
        ahorros.push(ahorro); // Añadir el objeto ahorro al array
        localStorage.setItem("ahorros", JSON.stringify(ahorros)); // Guardar el array completo en localStorage

        renderAhorro(ahorro);
        actualizarTotal(); // Actualizar el total después de agregar un nuevo ahorro
    } else {
        alert("Por favor, ingrese un monto válido.");
    }
});

// Función para renderizar un ahorro
function renderAhorro(ahorro) {
    const div = document.createElement("div");
    div.className = "card-2";
    div.innerHTML = `
        <h3>${ahorro.tipoAhorro}</h3>
        <p>${ahorro.fecha}</p>
        <h3>$${parseFloat(ahorro.monto).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        <div class="butons-vertical">
            <button class="tresPuntos"><img src="../images/trespuntos.png" alt="desplegable"></button>
            <button class="editUno ocultar"><img src="../images/edit.png" alt="edit"></button>
            <button class="borrarUno ocultar"><img src="../images/trash.png" alt="borrar"></button>
        </div>
    `;
    containerAhorros.append(div);

    // Añadir event listeners a los nuevos botones
    const tresPuntosBtn = div.querySelector('.tresPuntos');
    const editUnoBtn = div.querySelector('.editUno');
    const borrarUnoBtn = div.querySelector('.borrarUno');

    tresPuntosBtn.addEventListener("click", () => {
        editUnoBtn.classList.toggle("ocultar");
        borrarUnoBtn.classList.toggle("ocultar");
    });

    borrarUnoBtn.addEventListener("click", () => {
        const index = ahorros.findIndex(i => i === ahorro);
        if (index > -1) {
            ahorros.splice(index, 1);
            localStorage.setItem("ahorros", JSON.stringify(ahorros));
            div.remove();
            actualizarTotal();
        }
    });

    editUnoBtn.addEventListener("click", () => {
        let monto = parseFloat(prompt("Ingrese el monto"));
        if (!isNaN(monto)) {
            const index = ahorros.findIndex(i => i.tipoAhorro === ahorro.tipoAhorro);
            if (index > -1) {
                ahorros[index].monto = monto;
                localStorage.setItem("ahorros", JSON.stringify(ahorros));
                location.reload();
            }
        }
    });
}

// Función para actualizar el total de ahorros
function actualizarTotal() {
    let total = ahorros.reduce((acc, iterador) => acc + parseFloat(iterador.monto), 0);
    ahorrosMostrar.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; // Mostrar el total en el elemento
    contadorAhorros.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Renderizar todos los ahorros al cargar la página
ahorros.forEach(ahorro => {
    renderAhorro(ahorro);
});
actualizarTotal(); // Inicializar el total al cargar la página
