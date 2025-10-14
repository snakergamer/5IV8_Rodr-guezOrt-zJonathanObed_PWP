function problema1() {
    const input = document.getElementById('p1-input').value;
    const outputElement = document.getElementById('p1-output');
    
    if (!input.trim()) {
        outputElement.textContent = "Por favor, ingresa algunas palabras.";
        return;
    }
    
   
    const palabras = input.split(' ');
    const palabrasInvertidas = palabras.reverse();
    const resultado = palabrasInvertidas.join(' ');
    
    outputElement.textContent = resultado;
}
function problema2() {
  
    const x1 = parseFloat(document.getElementById('p2-x1').value) || 0;
    const x2 = parseFloat(document.getElementById('p2-x2').value) || 0;
    const x3 = parseFloat(document.getElementById('p2-x3').value) || 0;
    const x4 = parseFloat(document.getElementById('p2-x4').value) || 0;
    const x5 = parseFloat(document.getElementById('p2-x5').value) || 0;
    
   
    const y1 = parseFloat(document.getElementById('p2-y1').value) || 0;
    const y2 = parseFloat(document.getElementById('p2-y2').value) || 0;
    const y3 = parseFloat(document.getElementById('p2-y3').value) || 0;
    const y4 = parseFloat(document.getElementById('p2-y4').value) || 0;
    const y5 = parseFloat(document.getElementById('p2-y5').value) || 0;
    
    const outputElement = document.getElementById('p2-output');
    
 
    const vectorX = [x1, x2, x3, x4, x5];
    const vectorY = [y1, y2, y3, y4, y5];
    
   
    const xOrdenado = [...vectorX].sort((a, b) => a - b);
    const yOrdenado = [...vectorY].sort((a, b) => b - a);
    
    let productoMinimo = 0;
    for (let i = 0; i < xOrdenado.length; i++) {
        productoMinimo += xOrdenado[i] * yOrdenado[i];
    }
    
    outputElement.textContent = `Vector X: [${vectorX.join(', ')}]\nVector Y: [${vectorY.join(', ')}]\n\nMínimo producto escalar: ${productoMinimo}`;
}
function problema3() {
    const input = document.getElementById('p3-input').value;
    const outputElement = document.getElementById('p3-output');
    
    if (!input.trim()) {
        outputElement.textContent = "Por favor, ingresa algunas palabras.";
        return;
    }
    
    const palabras = input.split(' ').filter(palabra => palabra.trim() !== '');
    
    if (palabras.length === 0) {
        outputElement.textContent = "No se encontraron palabras válidas.";
        return;
    }
    
    let palabraMaxUnicos = '';
    let maxUnicos = 0;
    let detalles = '';

    palabras.forEach(palabra => {

        const palabraLimpia = palabra.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (palabraLimpia.length === 0) {
            detalles += `"${palabra}" - No contiene letras válidas\n`;
            return;
        }
        

        const caracteresUnicos = new Set(palabraLimpia);
        const numUnicos = caracteresUnicos.size;
        
        detalles += `"${palabra}" - ${numUnicos} caracteres únicos (${Array.from(caracteresUnicos).join(', ')})\n`;

        if (numUnicos > maxUnicos) {
            maxUnicos = numUnicos;
            palabraMaxUnicos = palabra;
        }
    });
    
    outputElement.textContent = `Palabra con más caracteres únicos: "${palabraMaxUnicos}" (${maxUnicos} caracteres únicos)\n\nDetalles:\n${detalles}`;
}
