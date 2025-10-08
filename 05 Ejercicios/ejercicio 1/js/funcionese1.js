function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function interes() {
    var valor = document.getElementById("cantidad").value;
    var meses = document.getElementById("meses").value;
    var errorMeses = document.getElementById("error-meses");
    

    if (meses === "" || isNaN(meses) || meses < 1 || meses > 18) {
        errorMeses.textContent = "Por favor ingresa un número válido de meses (1-18)";
        return;
    } else {
        errorMeses.textContent = "";
    }
    
    var parseo = parseFloat(valor);
    if (isNaN(parseo) || parseo <= 0) {
        alert("Por favor ingresa una cantidad válida");
        return;
    }
    

    var interes = parseo * (0.0885) * (meses / 12);
    var total = interes + parseo;
    

    document.getElementById("saldoi").textContent = "$ " + total.toFixed(2);//dejar validado los 2 decimales (dejar comentario)
}

function borrar() {
    document.getElementById("saldoi").textContent = "$ 0.00";
    document.getElementById("cantidad").value = "";
    document.getElementById("meses").value = "";
    document.getElementById("error-meses").textContent = "";
}

/* 
Del ejercicio 1 , tenemos que agregar el campo de numero de meses de maximo de 18 meses
del ejerccio 2 se debe ingresar 3 ventas, un sueldo base, y despues calcular el monto total, debe de aparecer cuanto cobra por comision
del ejercicio 3 se debe de ingresar un producto, con su precio y aplicarle el 5% y el sistema debe de mostrar el producto, precio, descuento y total a pagar
del ejercicio 4 se de ingresar calif 1, 2 ,3 se aplican el promedio y su orcentaje se ingresa trabajo final y se aplica un porcentaje y examen final se apica el porcentaje se debe mostrar el total de la calificaion
del ejercicio 5 se debe ingresar la cantidad hombres y la cantidad de mujeres y mostrar sus porcentajes correspondientes
del ejercicio 6 calcular la edad de una persona
*/