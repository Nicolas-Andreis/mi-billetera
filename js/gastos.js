let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let btnGasto = document.getElementById("agregarGasto");
let containerGastos = document.getElementById("container-card");
let gastosMostrar = document.getElementById("gastos");
let contadorGastos = document.getElementById("contador-gastos");

// Agregar un gasto al local storage y renderizarlo
btnGasto.addEventListener("click", () => {
    let tipoGasto = prompt("Ingrese el tipo de gasto");
    let fecha = new Date().toISOString().split('T')[0]; // Formatear la fecha a 'YYYY-MM-DD'
    let monto = parseFloat(prompt("Ingrese el monto")); // Convertir monto a número

    if (!isNaN(monto)) { // Verificar que monto sea un número válido
        let gasto = { tipoGasto: tipoGasto, fecha: fecha, monto: monto };
        gastos.push(gasto); // Añadir el objeto gasto al array
        localStorage.setItem("gastos", JSON.stringify(gastos)); // Guardar el array completo en localStorage

        renderGasto(gasto);
        actualizarTotal(); // Actualizar el total después de agregar un nuevo gasto
    } else {
        alert("Por favor, ingrese un monto válido.");
    }
});

// Función para renderizar un gasto
function renderGasto(gasto) {
    const div = document.createElement("div");
    div.className = "card-2";
    div.innerHTML = `
        <h3>${gasto.tipoGasto}</h3>
        <p>${gasto.fecha}</p>
        <h3>$${parseFloat(gasto.monto).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        <div class="butons-vertical">
            <button class="tresPuntos"><img src="../images/trespuntos.png" alt="desplegable"></button>
            <button class="editUno ocultar"><img src="../images/edit.png" alt="edit"></button>
            <button class="borrarUno ocultar"><img src="../images/trash.png" alt="borrar"></button>
        </div>
    `;
    containerGastos.append(div);

    // Añadir event listeners a los nuevos botones
    const tresPuntosBtn = div.querySelector('.tresPuntos');
    const editUnoBtn = div.querySelector('.editUno');
    const borrarUnoBtn = div.querySelector('.borrarUno');

    tresPuntosBtn.addEventListener("click", () => {
        editUnoBtn.classList.toggle("ocultar");
        borrarUnoBtn.classList.toggle("ocultar");
    });

    borrarUnoBtn.addEventListener("click", () => {
        const index = gastos.findIndex(i => i === gasto);
        if (index > -1) {
            gastos.splice(index, 1);
            localStorage.setItem("gastos", JSON.stringify(gastos));
            div.remove();
            actualizarTotal();
        }
    });

    editUnoBtn.addEventListener("click", () => {
        let monto = parseFloat(prompt("Ingrese el monto"));
        if (!isNaN(monto)) {
            const index = gastos.findIndex(i => i.tipoGasto === gasto.tipoGasto);
            if (index > -1) {
                gastos[index].monto = monto;
                localStorage.setItem("gastos", JSON.stringify(gastos));
                location.reload();
            }
        }
    });
}

// Función para actualizar el total de gastos
function actualizarTotal() {
    let total = gastos.reduce((acc, iterador) => acc + parseFloat(iterador.monto), 0);
    gastosMostrar.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; // Mostrar el total en el elemento
    contadorGastos.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Renderizar todos los gastos al cargar la página
gastos.forEach(gasto => {
    renderGasto(gasto);
});
actualizarTotal(); // Inicializar el total al cargar la página
