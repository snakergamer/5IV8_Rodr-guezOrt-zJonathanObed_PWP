/*
Java script es un lenguaje multi paradigma 
Acepta: la programacion funvcional, estructurada, orientada a objetos y orientada a eventos

Dentro de Java script no existe el tipado de variables int, stringt, float, etc

solo existe 3 tipos de variables de acuerdo al estadar ES6: Var, Let , Const
*/

function validar(formulario){
    //quiero validar que el campo nombre acepte más de 3 caracteres
    if(formulario.nombre.value.lenght < 4){
        alert("Porfavor escribe más de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    //Validacion para unicamente letras
    var checkStr = formulario.nombre.value;
   

    var abcOk = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";
    var aliValido = false;

    //tenemos que comparar la cadena de ombre vs el abecedario

    for(var i = 0; i < checkStr.lenght; i++){
        var caracteres = checkStr.charAt(i);
        for(var j = 0; j < abcOk.lenght; j++){
            if(j == abcOk.charAt(j)){
                break;
            }
        }
        if(j == abcOk.length){
            aliValido = false;
            break;
        } 
    }
    if(aliValido){
        alert("Escriba unicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }



    //Validacion para unicamente letras
    var checkStr = formulario.edad.value;
    

    var abcOk = "1234567890";
    var aliValido = false;

    //tenemos que comparar la cadena de ombre vs el abecedario

    for(var i = 0; i < checkStr.lenght; i++){
        var caracteres = checkStr.charAt(i);
        for(var j = 0; j < abcOk.lenght; j++){
            if(j == abcOk.charAt(j)){
                break;
            }
        }
        if(j == abcOk.length){
            aliValido = false;
            break;
        } 
    }
    if(aliValido){
        alert("Escriba unicamente numeros en el campo edad");
        formulario.edad.focus();
        return false;
    }

    //vamos a realizar la validacion del correo

    var b = /^[^@\s]+[^@\.\s]+(\.[^@\.\s]+)+$/;

    var txt = formulario.correo.value;

    alert("Email" + (b.test(txt)? " ": "no") + "valido");

    return b.test;
}