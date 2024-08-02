// main.js
document.addEventListener("DOMContentLoaded", () => {
    // Cargar ingresos desde localStorage
    let ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
    let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    let ahorros = JSON.parse(localStorage.getItem("ahorros")) || [];
    let balance = document.getElementById("balance");
    let totalIngresos = ingresos.reduce((acc, ingreso) => acc + parseFloat(ingreso.monto), 0);
    let totalGastos = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.monto), 0);;
    let totalAhorros = ahorros.reduce((acc, ahorro) => acc + parseFloat(ahorro.monto), 0);;
    let borrarTodo = document.getElementById("borrar-todo");

    // Función para actualizar el contador de ingresos
    function actualizarContadorIngresos() {
        
        let contadorIngresos = document.getElementById("contador-ingresos");
        if (contadorIngresos) {
            contadorIngresos.textContent = `$${totalIngresos.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    function actualizarContadorGastos(){
        let contadorGastos = document.getElementById("contador-gastos");
        if (contadorGastos) {
            contadorGastos.textContent = `$${totalGastos.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    function actualizarContadorAhorros(){
        let contadorAhorros = document.getElementById("contador-ahorros");
        if (contadorAhorros) {
            contadorAhorros.textContent = `$${totalAhorros.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    function actualizarBalance(){
        let total = totalIngresos - totalGastos - totalAhorros;
        balance.textContent = `$${total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    borrarTodo.addEventListener("click", () => {
        Swal.fire({
            title: "estas seguro?",
            text: "se borraran todos los datos",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#ff000040",
            cancelButtonColor: "#0080002e",
            confirmButtonText: "borrar",
            cancelButtonText: "cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Borrar los datos del localStorage y reiniciar los contadores solo después de la confirmación
                localStorage.removeItem("ingresos");
                localStorage.removeItem("gastos");
                localStorage.removeItem("ahorros");
                ingresos = [];
                gastos = [];
                ahorros = [];
                totalIngresos = 0;
                totalGastos = 0;
                totalAhorros = 0;
    
                // Actualizar los contadores y el balance
                actualizarContadorIngresos();
                actualizarContadorGastos();
                actualizarContadorAhorros();
                actualizarBalance();
    
                // Mostrar la alerta de éxito
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                }).then(() => {
                    // Recargar la página para reflejar los cambios
                    location.reload();
                });
            }
        });
    });
    


    // Actualizar contador al cargar la página
    actualizarContadorIngresos();
    actualizarContadorGastos();
    actualizarContadorAhorros();
    actualizarBalance();
});
