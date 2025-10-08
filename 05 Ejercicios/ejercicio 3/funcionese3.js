function validarNumero(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularDescuento() {

    var producto = document.getElementById("producto").value;
    var precio = document.getElementById("precio").value;
    var errorPrecio = document.getElementById("error-precio");
    

    if (producto === "") {
        alert("Por favor ingresa el nombre del producto");
        return;
    }
    
    if (precio === "") {
        errorPrecio.textContent = "Por favor ingresa el precio del producto";
        return;
    } else {
        errorPrecio.textContent = "";
    }
    

    precio = parseFloat(precio);
    

    if (isNaN(precio)) {
        errorPrecio.textContent = "Por favor ingresa un precio válido";
        return;
    }
    

    if (precio <= 0) {
        errorPrecio.textContent = "El precio debe ser mayor a cero";
        return;
    }

    var descuento = precio * 0.05;
    
 
    var total = precio - descuento;
    

    document.getElementById("result-producto").textContent = producto;
    document.getElementById("result-precio").textContent = "$ " + precio.toFixed(2);
    document.getElementById("result-descuento").textContent = "$ " + descuento.toFixed(2);
    document.getElementById("result-total").textContent = "$ " + total.toFixed(2);
    
    document.getElementById("results").style.display = "block";
}

function borrarDatos() {

    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    

    document.getElementById("error-precio").textContent = "";
    

    document.getElementById("results").style.display = "none";
}