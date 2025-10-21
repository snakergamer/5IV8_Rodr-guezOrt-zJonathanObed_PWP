var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas, ",
    "Para Ordenar las piezas guiate por la imagen Objetivo"
];

//vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//vamos a tener que crear una matriz donde tengamos las posiciones correctas

var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

//necesito saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

//necesitamos ahora si una funcion que se encargue de mostrar las intrucciones

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarIntruccionesLista(instrucciones[i], "lista-instrucciones");
    }
} 

//esta funcion se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarIntruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//vamos a crear una funcion para saber que gano
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){  
        for(var j = 0; j < rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si se gano
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Felicidades, ganaste el juego");
    }
    return false;
}

/*
    necesitamos una funcion que se encargue de poder intercambiar las posiciones de la pieza vacia vs cualquiera, para esto tenemos que hacer el uso de :
    arreglo[][] = posicion[][]
    //intercambiar
    poscion[][] = arreglo[][]
*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    // Intercambio
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevafila, nuevacolumna) {
    filaVacia = nuevafila;
    columnaVacia = nuevacolumna;
}
function posicionvalida(fila,columna){
    return(fila >= 0 && fila<=2 && columna >= 0 && columna <=2);
}

var codigosdireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

function moverendireccion(direccion){
    var nuevafilapiezavacia;
    var nuevacolumnapiezavacia;

    if(direccion === codigosdireccion.ABAJO){
        nuevacolumnapiezavacia = columnavacia;
        nuevafilapiezavacia = filavacia + 1;   
    }else if(direccion === codigosdireccion.ARRIBA){
        nuevacolumnapiezavacia = columnavacia;
        nuevafilapiezavacia = filavacia - 1;
    }else if(direccion === codigosdireccion.DERECHA){
        nuevafilapiezavacia = filavacia;
        nuevacolumnapiezavacia = columnavacia + 1;
    }else if(direccion === codigosdireccion.IZQUIERDA){
        nuevafilapiezavacia = filavacia;
        nuevacolumnapiezavacia = columnavacia - 1;
    }
    //mando a llamar la funcion de posicion valida

    if(posicionvalida(nuevafilapiezavacia, nuevacolumnapiezavacia)){
        //tengo que hacer una funcion que se encargue de intercambiar las posiciones
        intercambiarPosiciones(filavacia, columnavacia, nuevafilapiezavacia, nuevacolumnapiezavacia);
        actualizarPosicionVacia(nuevafilapiezavacia, nuevacolumnapiezavacia);
        //tengo que guardar el utimo movimiento
        agregarUltimoMovimiento(direccion);
    }
}
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    // Para el HTML
    intercambiarPosicionesDOM(`pieza` + pieza1, `pieza` + pieza2);
}
function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    // Clonar las piezas
    var padre1 = pieza1.parentNode;
    var padre2 = pieza2.parentNode;

    var clonePieza1 = pieza1.cloneNode(true);
    var clonePieza2 = pieza2.cloneNode(true);

    // Reemplazar en el DOM
    padre1.replaceChild(clonePieza2, pieza1);
    padre2.replaceChild(clonePieza1, pieza2);
}
//debo de actualizar los movimientos
function actualizarUltimoMovimiento(direccion){
   var ultimoMovimiento =document.getElementById("flecha");
   switch (direccion){
        case codigosdireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
        case codigosdireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosdireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosdireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
   }
}
//ahora mezclar piezas
function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Asi no se juega");
        return;
    }

    var direcciones = [codigosdireccion.ABAJO, codigosdireccion.ARRIBA, codigosdireccion.DERECHA, codigosdireccion.IZQUIERDA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverendireccion(direccion);

    //llamado recursivo
    setTimeout(function(){
        mezclarPiezas(veces - 1);
    },100);
}
//necitamos saber que flechas se estan moviendo
function capturarteclas(){
    document.body.onkeydown = (function(evento){
        if(evento.which === codigosdireccion.ABAJO ||
           evento.which === codigosdireccion.ARRIBA ||
           evento.which === codigosdireccion.DERECHA ||
           evento.which === codigosdireccion.IZQUIERDA){
               moverendireccion(evento.which);
               var gano = checarSiGano();
               if(gano){
                setTimeout( function(){
                   mostrarCartelGanador();
                },500);
                
           }
           evento.preventDefault();    
        }
    }
);
}

function iniciar(){
    //mezclar las piezas
    mezclarPiezas(30);
    capturarteclas();
    //mezclarPiezas

}

iniciar();

mostrarInstrucciones(instrucciones);
