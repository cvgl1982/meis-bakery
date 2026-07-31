const boton = document.getElementById("catalogoBtn");
const catalogo = document.getElementById("catalogo");
const contador = document.getElementById("contador");
const panel = document.getElementById("panelCarrito");
const iconoCarrito = document.querySelector(".carrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const total = document.getElementById("total");
const btnFinalizar = document.getElementById("btnFinalizar");

const formulario = document.getElementById("formularioCliente");
const enviarWhatsapp = document.getElementById("enviarWhatsapp");

const nombreCliente = document.getElementById("nombreCliente");
const telefonoCliente = document.getElementById("telefonoCliente");
const direccionCliente = document.getElementById("direccionCliente");


iconoCarrito.addEventListener("click",()=>{

    panel.classList.add("abierto");

});

cerrarCarrito.addEventListener("click",()=>{

    panel.classList.remove("abierto");

});

window.addEventListener("load", () => {

    mostrarCatalogo();

    contador.textContent = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    actualizarCarrito();

});

function mostrarCatalogo() {

    catalogo.innerHTML = "";

    productos.forEach(producto => {

        catalogo.innerHTML += `
            <div class="producto">

                <div class="imagenProducto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>

                <h2>${producto.nombre}</h2>

                <p>${producto.descripcion}</p>

                <h3 class="precio">$${producto.precio.toFixed(2)}</h3>

                <button
                    class="agregarBtn"
                    onclick="agregarProducto(${producto.id})">
                    Agregar
                </button>

            </div>
        `;

    });

    catalogo.scrollIntoView({
        behavior:"smooth"
    });

}

function agregarProducto(id) {

    // Buscar si el producto ya existe en el carrito
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
        // Si ya existe, aumenta la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no existe, lo agrega con cantidad 1
        const producto = productos.find(p => p.id === id);

        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    // Actualizar el contador (suma de cantidades)
    contador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

    actualizarCarrito();
    mostrarToast(productos.find(p => p.id === id).nombre);
    function mostrarToast(nombre){

    console.log("Toast ejecutado");

    toast.textContent = `🍪 ${nombre} agregada al carrito`;

    toast.classList.add("mostrar");

    setTimeout(()=>{
        toast.classList.remove("mostrar");
    },1500);

}
}


function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let totalCompra = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        listaCarrito.innerHTML += `
        <div class="itemCarrito">

            <div class="infoProducto">
                <strong>${producto.nombre}</strong>
                <small>$${producto.precio.toFixed(2)} c/u</small>
            </div>

            <div class="controlesCantidad">

                <button onclick="disminuirCantidad(${producto.id})">−</button>

                <span>${producto.cantidad}</span>

                <button onclick="aumentarCantidad(${producto.id})">+</button>

            </div>

            <strong>$${subtotal.toFixed(2)}</strong>

        </div>
        `;

        totalCompra += subtotal;

    });

    total.textContent = "$" + totalCompra.toFixed(2);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function aumentarCantidad(id){

    const producto = carrito.find(p => p.id === id);

    producto.cantidad++;

    contador.textContent = carrito.reduce(
        (total,item)=> total + item.cantidad,
        0
    );

    actualizarCarrito();

}
function disminuirCantidad(id){

    function mostrarToast(nombre){

    toast.textContent = `🍪 ${nombre} agregada al carrito`;

    toast.classList.add("mostrar");

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },1500);

}
    const producto = carrito.find(p => p.id === id);

    producto.cantidad--;

    if(producto.cantidad <= 0){

        carrito = carrito.filter(p => p.id !== id);

    }

    contador.textContent = carrito.reduce(
        (total,item)=> total + item.cantidad,
        0
    );

    actualizarCarrito();

}
btnFinalizar.addEventListener("click", ()=>{

    if(carrito.length===0){

        alert("Tu carrito está vacío.");

        return;

    }

    formulario.classList.remove("oculto");

});

enviarWhatsapp.addEventListener("click", finalizarPedido);

function finalizarPedido(){

    if(nombreCliente.value.trim()===""){

        alert("Ingrese su nombre");

        return;

    }

    let mensaje="🍪 *Nuevo pedido - Mei's Bakery*%0A%0A";

    mensaje+=`👤 Cliente: ${nombreCliente.value}%0A`;
    mensaje+=`📞 Teléfono: ${telefonoCliente.value}%0A`;
    mensaje+=`📍 Dirección: ${direccionCliente.value}%0A%0A`;

    let totalCompra=0;

    carrito.forEach(producto=>{

        const subtotal=producto.precio*producto.cantidad;

        mensaje+=`• ${producto.cantidad} x ${producto.nombre} = $${subtotal.toFixed(2)}%0A`;

        totalCompra+=subtotal;

    });

    mensaje+=`%0A💰 Total: $${totalCompra.toFixed(2)}`;

    const telefono="593983340297";

    window.open(`https://wa.me/${telefono}?text=${mensaje}`,"_blank");
    carrito = [];

actualizarCarrito();

contador.textContent = 0;

localStorage.removeItem("carrito");

formulario.classList.add("oculto");

nombreCliente.value = "";
telefonoCliente.value = "";
direccionCliente.value = "";

}
window.addEventListener("load", () => {

    contador.textContent = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    actualizarCarrito();

});