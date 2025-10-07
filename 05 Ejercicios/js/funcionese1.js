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
    var interes = parseo*(0.085);
    alert(interes);
    var total = interes+parseo;
    alert(total);
    document.getElementById("saldoi").value = "$ " + total;
}