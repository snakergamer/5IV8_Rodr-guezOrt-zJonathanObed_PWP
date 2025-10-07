function validarn (e){
    var teclado = (document.all)? e.keyCode : e.which;
    if(teclado == 8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);

}


function interes(){
    var valor = document.getElementById("cantidad").value;

    var paseo = parseFloat(valor);
    alert(paseo);
    var interes = parseo*(0.0885);
    alert(interes);
    var total = interes+parseo;
    alert(total);
    document.getElementById("saldoi").value = "$ " + total; //limite a dos decimales(dejar comentario)
}

function borrar(){
    document.getElementById("saldoi").value = "";
    document.getElementById("cantidadi").value = "";
}

/* 
Del ejercicio 1 , tenemos que agregar el campo de numero de meses de maximo de 18 meses
del ejerccio 2 se debe ingresar 3 ventas, un sueldo base, y despues calcular el monto total, debe de aparecer cuanto cobra por comision
del ejercicio 3 se debe de ingresar un producto, con su precio y aplicarle el 5% y el sistema debe de mostrar el producto, precio, descuento y total a pagar
del ejercicio 4 se de ingresar calif 1, 2 ,3 se aplican el promedio y su orcentaje se ingresa trabajo final y se aplica un porcentaje y examen final se apica el porcentaje se debe mostrar el total de la calificaion
del ejercicio 5 se debe ingresar la cantidad hombres y la cantidad de mujeres y mostrar sus porcentajes correspondientes
del ejercicio 6 calcular la edad de una persona
*/