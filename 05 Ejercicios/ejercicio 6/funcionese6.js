
        function calcularEdad() {
            var nacimiento = document.getElementById("nacimiento").value;
            var errorNacimiento = document.getElementById("error-nacimiento");
            
            errorNacimiento.textContent = "";
            
            if (nacimiento === "" || isNaN(nacimiento)) {
                errorNacimiento.textContent = "Ingresa un año válido";
                return;
            }
            
            nacimiento = parseInt(nacimiento);
            var añoActual = new Date().getFullYear();
            
            if (nacimiento > añoActual) {
                errorNacimiento.textContent = "El año no puede ser mayor al actual";
                return;
            }
            
            if (nacimiento < 1900) {
                errorNacimiento.textContent = "El año debe ser mayor a 1900";
                return;
            }
            
            var edad = añoActual - nacimiento;
            
            document.getElementById("edad").textContent = "Tienes " + edad + " años";
            document.getElementById("resultado").style.display = "block";
        }
        
        function limpiar() {
            document.getElementById("nacimiento").value = "";
            document.getElementById("error-nacimiento").textContent = "";
            document.getElementById("resultado").style.display = "none";
        }
    