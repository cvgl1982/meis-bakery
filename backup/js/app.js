const boton = document.getElementById("catalogoBtn");
const catalogo = document.getElementById("catalogo");
const contador = document.getElementById("contador");
const panel = document.getElementById("panelCarrito");
const iconoCarrito = document.querySelector(".carrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const total = document.getElementById("total");

iconoCarrito.addEventListener("click",()=>{

    panel.classList.add("abierto");

});

cerrarCarrito.addEventListener("click",()=>{

    panel.classList.remove("abierto");

});

boton.addEventListener("click", mostrarCatalogo);

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

                <h3>$ ${producto.precio.toFixed(2)}</h3>

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