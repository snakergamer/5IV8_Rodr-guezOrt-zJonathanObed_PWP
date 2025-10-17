var instrucciones = [
    "utiliza las flechas de navegacion para mover las piezas,",
    "para ordenar las piezas guiate por la imagen objetivo",
];
//vamos a guardar en una variable los movimientos del rompecabezas
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

//vamos a tener que crear una matriz donde tengamos las posiciones correctas
var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

//necesito saber las coordenadas de la pieza vacía, la que se va amover

var filavacia = 2;
var columnavacia = 2;

//necesitamos una fila que muestre las instrucciones

function mostrarInstrucciones(instrucciones){
    for(var i; i=0 ; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}
//esta funcion se encarga de crear el componente  li 

function mostrarInstruccionesLista(instruccioness, idlista){
    var ul = document.getElementById(idlista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function checarganar(){
    for(var i; i<rompe.length; i++){
        for(var j; j<rompe.length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
    }

}
}
//mostrar s se gano
function mostrarcartelganador(){
    if(checarganar()){
        alert("felcidades ganaste el juego");
    }
    return false;
}

/* necistamos una funcion que se encargue de poder intercambiar las posiciones de la pieza vacia vs cualquiera, para esta tenemos que hacer el uso de :
    areglo[][]= posicion [][]
    //intercambiar
    posicion[][]=arreglo[][];
*/
function intercambiarposiciones(filapos2,columnapos1,filapos2,columnapos1){
    var pos1 = rompe[filapos1][columnapos1];
    var pos2 = rompe[filapos2][columnapos2];

    rompe[filapos1,columnapos1] = pos2;
    rompe[filapos2,columnapos] = pos1;
}

function iniciar(){
    
    //mezclar las piezas
    //capturar el ultimo movimiento
}
mostrarInstrucciones(instrucciones);

