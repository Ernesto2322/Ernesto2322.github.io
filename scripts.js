// Simulación de almacenamiento para datos de usuario y donaciones
const usuarios = [];
const donaciones = [];

// Función para mostrar y ocultar secciones
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll("section");
    secciones.forEach(s => s.classList.add("oculto"));
    document.getElementById(seccion).classList.remove("oculto");
}

// Registro de usuario
function registrarUsuario() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    usuarios.push({ email, password });
    alert("Usuario registrado exitosamente");
    mostrarSeccion('login');
}

// Inicio de sesión
function iniciarSesion() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
        alert("Inicio de sesión exitoso");
        mostrarSeccion('donante');
        actualizarListaDonaciones();
    } else {
        alert("Correo o contraseña incorrectos");
    }
}

// Registro de donación
function registrarDonacion() {
    const tipo = document.getElementById("tipo-alimento").value;
    const cantidad = document.getElementById("cantidad-alimento").value;
    const ubicacion = document.getElementById("ubicacion-donacion").value;
    const nombreRestaurante = document.getElementById("nombre-restaurante").value;
    const donacion = { tipo, cantidad, ubicacion, nombreRestaurante };
    donaciones.push(donacion);
    alert("Donación registrada");
    mostrarSeccion('donante');
    actualizarListaDonaciones();
}

// Actualizar lista de donaciones
function actualizarListaDonaciones() {
    const lista = document.getElementById("lista-donaciones");
    lista.innerHTML = "";
    donaciones.forEach((d, index) => {
        const li = document.createElement("li");
        li.textContent = `${d.tipo} - ${d.cantidad} - ${d.ubicacion}`;
        li.onclick = () => verDetallesDonacion(index);
        lista.appendChild(li);
    });
}

// Mostrar detalles de donación
function verDetallesDonacion(index) {
    const donacion = donaciones[index];
    document.getElementById("detalle-nombre-restaurante").textContent = `Restaurante: ${donacion.nombreRestaurante}`;
    document.getElementById("detalle-cantidad").textContent = `Cantidad de Platos: ${donacion.cantidad}`;
    document.getElementById("detalle-ubicacion").textContent = `Ubicación: ${donacion.ubicacion}`;
    mostrarSeccion("detalles-donacion");
}

// Reservar donación
function reservarDonacion() {
    alert("Reserva realizada con éxito");
    mostrarSeccion("donante");
}

// Buscar donaciones
function buscarDonaciones() {
    const busqueda = document.getElementById("busqueda").value.toLowerCase();
    const resultados = donaciones.filter(d => d.tipo.toLowerCase().includes(busqueda));
    const resultadosLista = document.getElementById("resultados-busqueda");
    resultadosLista.innerHTML = "";
    resultados.forEach(d => {
        const li = document.createElement("li");
        li.textContent = `${d.tipo} - ${d.cantidad} - ${d.ubicacion}`;
        resultadosLista.appendChild(li);
    });
}
