// Simulación de almacenamiento para datos de usuario y donaciones
const usuarios = [];
const donaciones = [
    { nombreRestaurante: 'Mercado Central', tipo: 'Frutas variadas', cantidad: 5, ubicacion: 'Centro', precioOriginal: 15, precioDescuento: 5, fechaExpiracion: '2024-11-12', estrellas: 4, donacionesTotales: 10 },
    { nombreRestaurante: 'Panadería Don José', tipo: 'Pan del día', cantidad: 20, ubicacion: 'Centro', precioOriginal: 10, precioDescuento: 0, fechaExpiracion: '2024-11-10', estrellas: 5, donacionesTotales: 15 },
];

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
    const fechaExpiracion = document.getElementById("fecha-expiracion").value;
    const precioOriginal = parseFloat(prompt("Ingresa el precio original de la donación"));
    const precioDescuento = parseFloat(prompt("Ingresa el precio con descuento (puede ser 0 si es gratuito)"));
    
    const donacion = { tipo, cantidad, ubicacion, nombreRestaurante, precioOriginal, precioDescuento, fechaExpiracion, estrellas: 0, donacionesTotales: 0 };
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
        const diasRestantes = calcularDiasRestantes(d.fechaExpiracion);
        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <h3>${d.nombreRestaurante}</h3>
                <p>${d.tipo} - ${d.cantidad} unidades</p>
                <p>Ubicación: ${d.ubicacion}</p>
                <p>Expira en: ${diasRestantes} días</p>
                ${mostrarEstrellas(d.estrellas)} <!-- Mostrar estrellas -->
                ${d.donacionesTotales >= 10 ? '<p class="certificado">Sello Foodie 🍴</p>' : ''}
            </div>
            <div>
                <p><span style="text-decoration:line-through;">S/. ${d.precioOriginal.toFixed(2)}</span> S/. ${d.precioDescuento.toFixed(2)}</p>
                <button class="reservar" onclick="reservarDonacion()">¡Reservar YA!</button>
            </div>
        `;
        
        lista.appendChild(li);
    });
}

// Mostrar estrellas
function mostrarEstrellas(cantidad) {
    let estrellasHTML = '<div class="stars">';
    for (let i = 1; i <= 5; i++) {
        estrellasHTML += i <= cantidad ? '<span class="star">★</span>' : '<span class="star star-empty">☆</span>';
    }
    estrellasHTML += '</div>';
    return estrellasHTML;
}

// Calcular días restantes hasta la expiración
function calcularDiasRestantes(fecha) {
    const hoy = new Date();
    const expiracion = new Date(fecha);
    const diferencia = expiracion - hoy;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

// Función de reserva de donación
function reservarDonacion() {
    alert("Donación reservada con éxito");
}

// Función de búsqueda de donaciones
function buscarDonaciones() {
    const busqueda = document.getElementById("busqueda").value.toLowerCase();
    const resultados = donaciones.filter(d => d.tipo.toLowerCase().includes(busqueda));
    const listaResultados = document.getElementById("resultados-busqueda");
    listaResultados.innerHTML = "";
    resultados.forEach(d => {
        const li = document.createElement("li");
        li.textContent = `${d.nombreRestaurante}: ${d.tipo} (${d.cantidad} unidades)`;
        listaResultados.appendChild(li);
    });
}
