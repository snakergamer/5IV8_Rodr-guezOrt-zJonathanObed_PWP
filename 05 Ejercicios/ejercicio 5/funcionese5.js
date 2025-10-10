
        function calcularPorcentajes() {
            var hombres = document.getElementById("hombres").value;
            var mujeres = document.getElementById("mujeres").value;
            
            var errorHombres = document.getElementById("error-hombres");
            var errorMujeres = document.getElementById("error-mujeres");
            
            errorHombres.textContent = "";
            errorMujeres.textContent = "";
            
            var tieneError = false;
            
            if (hombres === "" || isNaN(hombres) || hombres < 0) {
                errorHombres.textContent = "Ingresa un número válido";
                tieneError = true;
            }
            
            if (mujeres === "" || isNaN(mujeres) || mujeres < 0) {
                errorMujeres.textContent = "Ingresa un número válido";
                tieneError = true;
            }
            
            if (tieneError) return;
            
            hombres = parseFloat(hombres);
            mujeres = parseFloat(mujeres);
            
            var total = hombres + mujeres;
            
            if (total === 0) {
                alert("El total no puede ser cero");
                return;
            }
            
            var porcHombres = (hombres / total) * 100;
            var porcMujeres = (mujeres / total) * 100;
            
            document.getElementById("total").textContent = total;
            document.getElementById("porc-hombres").textContent = porcHombres.toFixed(2) + "%";
            document.getElementById("porc-mujeres").textContent = porcMujeres.toFixed(2) + "%";
            document.getElementById("resultado").style.display = "block";
        }
        
        function limpiar() {
            document.getElementById("hombres").value = "";
            document.getElementById("mujeres").value = "";
            document.getElementById("error-hombres").textContent = "";
            document.getElementById("error-mujeres").textContent = "";
            document.getElementById("resultado").style.display = "none";
        }
    