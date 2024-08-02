let ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
let btnIngreso = document.getElementById("agregarIngreso");
let containerIngresos = document.getElementById("container-card");
let ingresosMostrar = document.getElementById("ingresos");
let contadorIngresos = document.getElementById("contador-ingresos");

// Agregar un ingreso al local storage y renderizarlo
btnIngreso.addEventListener("click", () => {
    let tipoIngreso = prompt("Ingrese el tipo de ingreso");
    let fecha = new Date().toISOString().split('T')[0]; // Formatear la fecha a 'YYYY-MM-DD'
    let monto = parseFloat(prompt("Ingrese el monto")); // Convertir monto a número

    if (!isNaN(monto)) { // Verificar que monto sea un número válido
        let ingreso = { tipoIngreso: tipoIngreso, fecha: fecha, monto: monto };
        ingresos.push(ingreso); // Añadir el objeto ingreso al array
        localStorage.setItem("ingresos", JSON.stringify(ingresos)); // Guardar el array completo en localStorage

        renderIngreso(ingreso);
        actualizarTotal(); // Actualizar el total después de agregar un nuevo ingreso
    } else {
        alert("Por favor, ingrese un monto válido.");
    }
});

// Función para renderizar un ingreso
function renderIngreso(ingreso) {
    const div = document.createElement("div");
    div.className = "card-2";
    div.innerHTML = `
        <h3>${ingreso.tipoIngreso}</h3>
        <p>${ingreso.fecha}</p>
        <h3>$${parseFloat(ingreso.monto).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        <div class="butons-vertical">
            <button class="tresPuntos"><img src="../images/trespuntos.png" alt="desplegable"></button>
            <button class="editUno ocultar"><img src="../images/edit.png" alt="edit"></button>
            <button class="borrarUno ocultar"><img src="../images/trash.png" alt="borrar"></button>
        </div>
    `;
    containerIngresos.append(div);

    // Añadir event listeners a los nuevos botones
    const tresPuntosBtn = div.querySelector('.tresPuntos');
    const editUnoBtn = div.querySelector('.editUno');
    const borrarUnoBtn = div.querySelector('.borrarUno');

    tresPuntosBtn.addEventListener("click", () => {
        editUnoBtn.classList.toggle("ocultar");
        borrarUnoBtn.classList.toggle("ocultar");
    });

    borrarUnoBtn.addEventListener("click", () => {
        const index = ingresos.findIndex(i => i === ingreso);
        if (index > -1) {
            ingresos.splice(index, 1);
            localStorage.setItem("ingresos", JSON.stringify(ingresos));
            div.remove();
            actualizarTotal();
        }
    });

    
    editUnoBtn.addEventListener("click", () => {
        let monto = parseFloat(prompt("Ingrese el monto"));
        if(!isNaN(monto)){
            const index = ingresos.findIndex(i => i.tipoIngreso === ingreso.tipoIngreso);
            if (index > -1) {
                ingresos[index].monto = monto;
                localStorage.setItem("ingresos", JSON.stringify(ingresos));
                location.reload();
            }
        }
    });
}

// Función para actualizar el total de ingresos
function actualizarTotal() {
    let total = ingresos.reduce((acc, iterador) => acc + parseFloat(iterador.monto), 0);
    ingresosMostrar.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; // Mostrar el total en el elemento
    contadorIngresos.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Renderizar todos los ingresos al cargar la página
ingresos.forEach(ingreso => {
    renderIngreso(ingreso);
});
actualizarTotal(); // Inicializar el total al cargar la página
