/* 

JS Maneja variables del siguiente modo:

var -> una variable de acceso local y global dependiendo de donde se declare
let -> es una variable "protegida", solo se puede hacer uso dentro de la funcion o bloque donde se declara
const -> es una variable que no puede cambiar su valor, es una constante



var x = "hola";

if(true){
    let x = "habia una vez";
    console.log(x); 
}

//como usamos las funciones
function suma(n1, n2){
    return n1 + n2;
}
console.log(`Esta suma es de: ${suma(5, 3)}`);


//las funciones flecha, nos ayudan a poder realizar operaciones de una forma mucho mas sencilla, de acuerdo a la siguiente estructura
// "cadena" -> id, clase, metodo, nombre, atributo

const suma = (n1, n2) => n1 + n2;
console.log(`Esta suma es de: ${suma(5, 3)}`);


const razasDePerros = [
    "Pastor Aleman",
    "Labrador Retriever",
    "Bulldog Frances",
    "Beagle",
    "Chihuahua",
    "Dalmata",
    "Salchicha",
    "Pug"
];
*/
//formas de recorrer e imprimir los elementos de un arreglo
//for
/*
for(let i = 0; i < razasDePerros.length; i++){
    console.log(razasDePerros[i]);
}

//for of

for(const raza of razasDePerros){
    console.log(raza);
}

//for in
for (const indice in razasDePerros){
    console.log(razasDePerros[indice]);
}

//forEach itera sobr los elementos del arreglo y no devuelve nada
//todos los forEach son funciones flecha por defecto

razasDePerros.forEach(raza => console.log(raza));

//la estructura general del forEach es la siguiente
// argumento.forEach((raza, indice, arregloOriginal) => {codigo a ejecutar})

razasDePerros.forEach((raza, indice, razasDePerros) => console.log(raza));


//funcion MAP -> iterar sobre los elementos del arreglo, y regresa un arreglo diferente con el cual podemos jugar

const razasDePerrosMayusculas = razasDePerros.map(raza => raza.toUpperCase());
console.log(razasDePerrosMayusculas);


//FIND -> nos permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra, lo retorna sino lanza un "undefined" 
if(razasDePerros.find(raza => raza === "Chihuahua")){
    console.log("Si se encontro la raza");
    console.log(razasDePerros);
}else{
    //hay que meterlo
    razasDePerros.push("Chihuahua");
    console.log(razasDePerros);
    
}



//FINDINDEX -> nos permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra, regresa el indice del elemento, sino regresa un -1, esta funcion esparticulamente util cuanod necesitamos modificar o eliminar de un arreglo original, dentro de una copia del mismo

const indiceChihuahua = razasDePerros.findIndex(raza => raza === "Chihuahua");
if(indiceChihuahua > -1){
    //si se encontro y esta dentro del arreglo  
    console.log(razasDePerros[indiceChihuahua]);
    //aparte le voy a decir que agregue un texto a este resultado
    razasDePerros[indiceChihuahua] += " (Es una raza de perros chiquita y chillona)";
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros);
}
    */
   function calcularOperacion() {
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const resultado = document.getElementById('resultado1');
            
            if (isNaN(num1) || isNaN(num2)) {
                resultado.textContent = 'Por favor ingresa ambos números';
                return;
            }
            
            let operacion;
            if (num1 === num2) {
                operacion = num1 * num2;
                resultado.textContent = `Son iguales, multiplicación: ${operacion}`;
            } else if (num1 > num2) {
                operacion = num1 - num2;
                resultado.textContent = `Primero es mayor, resta: ${operacion}`;
            } else {
                operacion = num1 + num2;
                resultado.textContent = `Segundo es mayor, suma: ${operacion}`;
            }
        }

        function encontrarMayor() {
            const numA = parseFloat(document.getElementById('numA').value);
            const numB = parseFloat(document.getElementById('numB').value);
            const numC = parseFloat(document.getElementById('numC').value);
            const resultado = document.getElementById('resultado2');
            
            if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
                resultado.textContent = 'Por favor ingresa los tres números';
                return;
            }
            
            if (numA === numB || numA === numC || numB === numC) {
                resultado.textContent = 'Los números deben ser diferentes';
                return;
            }
            
            const mayor = Math.max(numA, numB, numC);
            resultado.textContent = `El número mayor es: ${mayor}`;
        }

        function calcularHorasExtra() {
            const horas = parseFloat(document.getElementById('horasTrabajadas').value);
            const salario = parseFloat(document.getElementById('salarioHora').value);
            const resultado = document.getElementById('resultado3');
            
            if (isNaN(horas) || isNaN(salario) || horas < 0 || salario < 0) {
                resultado.textContent = 'Por favor ingresa valores válidos';
                return;
            }
            
            let pagoTotal;
            if (horas <= 40) {
                pagoTotal = horas * salario;
                resultado.textContent = `Pago normal: $${pagoTotal.toFixed(2)}`;
            } else {
                const horasExtra = horas - 40;
                let pagoExtra;
                
                if (horasExtra <= 8) {
                    pagoExtra = horasExtra * salario * 2;
                } else {
                    pagoExtra = (8 * salario * 2) + ((horasExtra - 8) * salario * 3);
                }
                
                pagoTotal = (40 * salario) + pagoExtra;
                resultado.textContent = `Pago total con horas extra: $${pagoTotal.toFixed(2)}`;
            }
        }

        function calcularUtilidades() {
            const salario = parseFloat(document.getElementById('salarioMensual').value);
            const antiguedad = parseFloat(document.getElementById('antiguedad').value);
            const resultado = document.getElementById('resultado4');
            
            if (isNaN(salario) || isNaN(antiguedad) || salario < 0 || antiguedad < 0) {
                resultado.textContent = 'Por favor ingresa valores válidos';
                return;
            }
            
            let porcentaje;
            if (antiguedad < 1) {
                porcentaje = 0.05;
            } else if (antiguedad >= 1 && antiguedad < 2) {
                porcentaje = 0.07;
            } else if (antiguedad >= 2 && antiguedad < 5) {
                porcentaje = 0.10;
            } else if (antiguedad >= 5 && antiguedad < 10) {
                porcentaje = 0.15;
            } else {
                porcentaje = 0.20;
            }
            
            const utilidadAnual = salario * 12 * porcentaje;
            resultado.textContent = `Utilidades anuales: $${utilidadAnual.toFixed(2)} (${(porcentaje * 100)}%)`;
        }