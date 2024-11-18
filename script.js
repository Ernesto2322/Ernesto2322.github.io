let donaciones = [];

function mostrarSeccion(seccion) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("oculto"));
    document.getElementById(seccion).classList.remove("oculto");
}

function registrarUsuario() {
    alert("Usuario registrado exitosamente.");
    mostrarSeccion("inicio");
}

function iniciarSesion() {
    alert("Inicio de sesión exitoso.");
    mostrarSeccion("donante");
}

function registrarDonacion() {
    const tipo = document.getElementById("tipo-alimento").value;
    const cantidad = parseInt(document.getElementById("cantidad-alimento").value, 10);
    const ubicacion = document.getElementById("ubicacion-donacion").value;
    const nombreRestaurante = document.getElementById("nombre-restaurante").value;
    const precioOriginal = parseFloat(document.getElementById("precio-original").value);
    const precioDescuento = parseFloat(document.getElementById("precio-descuento").value);
    const diasExpiracion = parseInt(document.getElementById("tiempo-expiracion").value, 10);
    const foto = URL.createObjectURL(document.getElementById("foto-restaurante").files[0]);

    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + diasExpiracion);

    const donacion = {
        tipo,
        cantidad,
        ubicacion,
        nombreRestaurante,
        precioOriginal,
        precioDescuento,
        fechaExpiracion: fechaActual.toISOString().split('T')[0],
        estrellas: 0,
        comentarios: [],
        foto,
    };

    donaciones.push(donacion);
    alert("Donación registrada.");
    mostrarSeccion("donante");
    actualizarListaDonaciones();
}

function actualizarListaDonaciones() {
    const lista = document.getElementById("lista-donaciones");
    lista.innerHTML = "";
    donaciones.forEach((d, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="info-donacion">
                <img src="${d.foto}" alt="Foto del restaurante" class="mini-foto">
                <div>
                    <span><strong>${d.nombreRestaurante}</strong> - ${d.tipo} (${d.cantidad} platos)</span>
                    <div class="certificado-lista ${d.estrellas >= 4 ? "" : "oculto"}">
                        🏅 Certificado Foodie 🍴 - ${d.estrellas} Estrellas
                    </div>
                </div>
            </div>
            <button onclick="mostrarDetalleRestaurante(${index})">Ver Detalle</button>
        `;
        lista.appendChild(li);
    });
}

function mostrarDetalleRestaurante(index) {
    const restaurante = donaciones[index];
    document.getElementById("restaurante-nombre").textContent = restaurante.nombreRestaurante;
    document.getElementById("restaurante-informacion").innerHTML = `
        <div class="foto-y-reserva">
            <img src="${restaurante.foto}" alt="Foto del restaurante">
            <button onclick="reservarDonacion()">Reservar</button>
        </div>
        <p>Tipo: ${restaurante.tipo}</p>
        <p>Cantidad: ${restaurante.cantidad} unidades</p>
        <p>Ubicación: ${restaurante.ubicacion}</p>
        <p>Precio Original: S/${restaurante.precioOriginal.toFixed(2)}</p>
        <p>Precio con Descuento: S/${restaurante.precioDescuento.toFixed(2)}</p>
        <p>Fecha de Expiración: ${restaurante.fechaExpiracion}</p>
    `;

    mostrarCertificado(restaurante);
    actualizarComentarios(index);
    mostrarSeccion("restaurante-detalle");
    document.getElementById("restaurante-detalle").setAttribute("data-index", index);
}

function agregarComentario() {
    const index = document.getElementById("restaurante-detalle").getAttribute("data-index");
    const comentario = document.getElementById("nuevo-comentario").value;
    const estrellas = parseInt(document.getElementById("nueva-valoracion").value, 10);

    if (comentario.trim()) {
        donaciones[index].comentarios.push({ texto: comentario, estrellas });
        actualizarEstrellasPromedio(index);
        document.getElementById("nuevo-comentario").value = "";
        actualizarComentarios(index);
    } else {
        alert("Por favor, escribe un comentario válido.");
    }
}

function actualizarComentarios(index) {
    const comentarios = donaciones[index].comentarios;
    const listaComentarios = document.getElementById("comentarios");
    listaComentarios.innerHTML = "";
    comentarios.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `${c.texto} <strong>(${c.estrellas} estrellas)</strong>`;
        listaComentarios.appendChild(li);
    });
}

function actualizarEstrellasPromedio(index) {
    const restaurante = donaciones[index];
    const totalEstrellas = restaurante.comentarios.reduce((acc, c) => acc + c.estrellas, 0);
    const promedio = totalEstrellas / restaurante.comentarios.length || 0;
    restaurante.estrellas = promedio.toFixed(1);
    mostrarCertificado(restaurante);
}

function mostrarCertificado(restaurante) {
    const certificado = document.getElementById("certificado");
    if (restaurante.estrellas >= 4) {
        certificado.classList.remove("oculto");
        certificado.textContent = `🏅 Certificado Foodie 🍴 - ${restaurante.estrellas} Estrellas`;
    } else {
        certificado.classList.add("oculto");
    }
}

function reservarDonacion() {
    alert("¡Reserva realizada exitosamente!");
}
