class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const frutilla = new Producto(1, "Bomba Frutilla", 5500, "/img/bombafrutilla.jpg");
const lemonPie = new Producto(2, "Lemon Pie", 5300, "/img/lemonpie.jpg");
const durazno = new Producto(3, "Durazno", 5200, "/img/durazno.jpg");
const oreo = new Producto(4, "Oreo", 5700, "/img/oreo.jpg");
const brownie = new Producto(5, "Brownie", 7200, "/img/brownie.jpg");
const duoVerano = new Producto(6, "Duo Verano", 5900, "/img/FrambuesaFrutilla.jpg");
const lemonCabsha = new Producto(7, "lemon y Cabsha", 5900, "/img/lemonCabsha.jpg");
const mixCombinado = new Producto(8, "Mix Delicias", 5750, "/img/mixCombinado.jpg");

// ME GANASTE FETCH ---- PRONTO LO VOY AGREGAR



// Creamos un array con nuestro catalogo de tartas
// El inventario o stock seria

const productos = [frutilla, lemonPie, durazno, oreo, brownie,duoVerano,lemonCabsha,mixCombinado]

// Esta vacio porque inicialemente no hay nada a medida que navego lo cargo 
let carrito = [];

/**** CARGAR CARRITO DESDE EL LOCALSTORAGE *****/
// Si hay algo en localStorage, lo cargamos en el carrito.
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


console.log(productos)

const contenedorProductos = document.getElementById("contenedorProductos");

// Creamos una funcion para mostrar los productos...
const mostrarProductos = () => {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        // agregamos las clases!!!
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card">
            <div class="card-header">
            </div>
            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <a href="#" class="btn btn-secondary" id="boton${producto.id}">Agregar producto</a>
            </div>
        </div>
        
        `
        contenedorProductos.appendChild(card);
        
        // Agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
}


// Funcion agregar al carrito:
const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id == id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;   
    }else {
        carrito.push(producto);
        // Al final de la clase guardamos en el local storage
        // Trabajamos con el localStorage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    /*
    Toastify({
        text: `Añadido al carrito: ${producto.nombre}`,
        duration: 5000, 
        close: true, 
        gravity: "top", 
        position: "center", 
    }).showToast();
    */
    
    Swal.fire({
        title: 'Producto Agregado',
        text: `Has agregado ${producto.nombre} al carrito.`,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK'
    });

    calcularTotal();
}

mostrarProductos();

// mostrar carrito de compras

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () =>{
    mostrarCarrito();
})

// Funcion para mostrar el carrito:

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        // agregamos las clases!!!
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card">
            <div class="card-header">
            </div>
            <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <p class="card-text">${producto.cantidad}</p>
                <a href="#" class="btn btn-primary" id="eliminar${producto.id}">Eliminar producto</a>
            </div>
        </div>
        
        `
        contenedorCarrito.appendChild(card);

        // Eliminar producto del carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

// Funcion que elimina el producto del carrito 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //LocalStorage:
    localStorage.setItem("carrito",JSON.stringify(carrito));
    
    Toastify({
        text: `Producto eliminado: ${producto.nombre}`,
        duration: 5000, 
        close: true, 
        gravity: "bottom", 
        position: "center", 
    }).showToast();
}

// Vaciamos todo el carrito de compras:
vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})


// Función para vaciar todo el carrito de compras
const eliminarTodoElCarrito = () => {
    // Verificamos si el carrito está vacío
    if (carrito.length === 0) {
        // Si está vacío, mostramos un mensaje de alerta sin vaciar el carrito
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'No hay productos en el carrito para vaciar.',
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'OK'
        });
    } else {
        // Si el carrito no está vacío, mostramos un mensaje de confirmación
        Swal.fire({
            title: '¿Vaciar Carrito?',
            text: '¿Estás seguro de que deseas vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Vaciamos el carrito
                carrito = [];
                mostrarCarrito();
                //LocalStorage:
                localStorage.clear();

                // Mostramos una alerta de éxito
                Swal.fire({
                    title: 'Carrito Vacío',
                    text: 'El carrito se ha vaciado con éxito.',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                });
            }
        });
    }
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
        //
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

// Mostramos el mensaje con el total de la compra...

// Función para obtener el resumen de la compra
const obtenerResumenCompra = () => {
    let resumen = 'Resumen de la Compra:\n\n';
    let importeTotal = 0;

    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        resumen += `${producto.nombre} x ${producto.cantidad}: $${subtotal}\n`;
        importeTotal += subtotal;
    });

    resumen += `\nTotal: $${importeTotal}`;
    return resumen;
};

// Selecciona el botón "Finalizar Compra" por su ID
const finalizarCompraButton = document.getElementById("finalizarCompra");

// Agrega un evento click al botón
finalizarCompraButton.addEventListener("click", () => {
    // Verifica si el carrito está vacío
    if (carrito.length === 0) {
        // Si está vacío, muestra una alerta informativa
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'No hay productos en el carrito para finalizar la compra.',
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'OK'
        });
    } else {
        // Si el carrito no está vacío, muestra un SweetAlert con los detalles de la compra
        Swal.fire({
            title: 'Detalles de la Compra',
            text: obtenerResumenCompra(),
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, finalizar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Luego de confirmar la compra, dirige al usuario a WhatsApp para informar la compra
                const numeroDeTelefono = '3515514344'; 
                const mensaje = obtenerResumenCompra();
                const urlWhatsApp = `https://wa.me/${numeroDeTelefono}/?text=${encodeURIComponent(mensaje)}`;

                window.open(urlWhatsApp, '_blank');
            }
        });
    }
});

// ME GANASTE FETCH ---- PRONTO LO VOY AGREGAR
