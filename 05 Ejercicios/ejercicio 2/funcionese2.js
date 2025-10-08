
        function validarNumero(e) {
            var teclado = (document.all) ? e.keyCode : e.which;
            if (teclado == 8) return true;
            var patron = /[0-9\d .]/;
            var codigo = String.fromCharCode(teclado);
            return patron.test(codigo);
        }

        function calcularComision() {
            var sueldoBase = document.getElementById("sueldo-base").value;
            var venta1 = document.getElementById("venta1").value;
            var venta2 = document.getElementById("venta2").value;
            var venta3 = document.getElementById("venta3").value;
            

            if (sueldoBase === "" || venta1 === "" || venta2 === "" || venta3 === "") {
                alert("Por favor completa todos los campos");            // Validar que todos los campos estén completos
                return;
            }
            
            // Convertir a números
            sueldoBase = parseFloat(sueldoBase);
            venta1 = parseFloat(venta1);
            venta2 = parseFloat(venta2);
            venta3 = parseFloat(venta3);
            
            // Validar que sean números válidos
            if (isNaN(sueldoBase) || isNaN(venta1) || isNaN(venta2) || isNaN(venta3)) {
                alert("Por favor ingresa valores numéricos válidos");
                return;
            }
            

            if (sueldoBase < 0 || venta1 < 0 || venta2 < 0 || venta3 < 0) {
                alert("Por favor ingresa valores positivos");
                return;
            }
            

            var totalVentas = venta1 + venta2 + venta3;
            

            var comision = totalVentas * 0.10;
            

            var totalCobrar = sueldoBase + comision;
            

            document.getElementById("total-ventas").textContent = "$ " + totalVentas.toFixed(2);
            document.getElementById("comision").textContent = "$ " + comision.toFixed(2);
            document.getElementById("sueldo-base-result").textContent = "$ " + sueldoBase.toFixed(2);
            document.getElementById("total-cobrar").textContent = "$ " + totalCobrar.toFixed(2);
        }
//limpiar
        function borrarDatos() {

            document.getElementById("sueldo-base").value = "";
            document.getElementById("venta1").value = "";
            document.getElementById("venta2").value = "";
            document.getElementById("venta3").value = "";
            

            document.getElementById("total-ventas").textContent = "$ 0.00";
            document.getElementById("comision").textContent = "$ 0.00";
            document.getElementById("sueldo-base-result").textContent = "$ 0.00";
            document.getElementById("total-cobrar").textContent = "$ 0.00";
        }