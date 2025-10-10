function validarNumero(e) {
            var teclado = (document.all) ? e.keyCode : e.which;
            if (teclado == 8) return true;
            var patron = /[0-9\d .]/;
            var codigo = String.fromCharCode(teclado);
            return patron.test(codigo);
        }

        function calcularCalificacion() {
            var calif1 = document.getElementById("calif1").value;
            var calif2 = document.getElementById("calif2").value;
            var calif3 = document.getElementById("calif3").value;
            var examen = document.getElementById("examen").value;
            var trabajo = document.getElementById("trabajo").value;
            
            var errorCalif1 = document.getElementById("error-calif1");
            var errorCalif2 = document.getElementById("error-calif2");
            var errorCalif3 = document.getElementById("error-calif3");
            var errorExamen = document.getElementById("error-examen");
            var errorTrabajo = document.getElementById("error-trabajo");
            
            var errores = false;
            
            errorCalif1.textContent = "";
            errorCalif2.textContent = "";
            errorCalif3.textContent = "";
            errorExamen.textContent = "";
            errorTrabajo.textContent = "";
            
            if (calif1 === "" || isNaN(calif1) || calif1 < 0 || calif1 > 100) {
                errorCalif1.textContent = "Ingresa un valor entre 0-100";
                errores = true;
            }
            
            if (calif2 === "" || isNaN(calif2) || calif2 < 0 || calif2 > 100) {
                errorCalif2.textContent = "Ingresa un valor entre 0-100";
                errores = true;
            }
            
            if (calif3 === "" || isNaN(calif3) || calif3 < 0 || calif3 > 100) {
                errorCalif3.textContent = "Ingresa un valor entre 0-100";
                errores = true;
            }
            
            if (examen === "" || isNaN(examen) || examen < 0 || examen > 100) {
                errorExamen.textContent = "Ingresa un valor entre 0-100";
                errores = true;
            }
            
            if (trabajo === "" || isNaN(trabajo) || trabajo < 0 || trabajo > 100) {
                errorTrabajo.textContent = "Ingresa un valor entre 0-100";
                errores = true;
            }
            
            if (errores) return;
            
            calif1 = parseFloat(calif1);
            calif2 = parseFloat(calif2);
            calif3 = parseFloat(calif3);
            examen = parseFloat(examen);
            trabajo = parseFloat(trabajo);
            
            var promedio = (calif1 + calif2 + calif3) / 3;
            var valorParciales = promedio * 0.55;
            var valorExamen = examen * 0.30;
            var valorTrabajo = trabajo * 0.15;
            var calificacionFinal = valorParciales + valorExamen + valorTrabajo;
            
            document.getElementById("result-promedio").textContent = promedio.toFixed(2);
            document.getElementById("result-valor-parciales").textContent = valorParciales.toFixed(2);
            document.getElementById("result-valor-examen").textContent = valorExamen.toFixed(2);
            document.getElementById("result-valor-trabajo").textContent = valorTrabajo.toFixed(2);
            document.getElementById("result-final").textContent = calificacionFinal.toFixed(2);
            
            document.getElementById("results").style.display = "block";
        }

        function borrarDatos() {
            document.getElementById("calif1").value = "";
            document.getElementById("calif2").value = "";
            document.getElementById("calif3").value = "";
            document.getElementById("examen").value = "";
            document.getElementById("trabajo").value = "";
            
            document.getElementById("error-calif1").textContent = "";
            document.getElementById("error-calif2").textContent = "";
            document.getElementById("error-calif3").textContent = "";
            document.getElementById("error-examen").textContent = "";
            document.getElementById("error-trabajo").textContent = "";
            
            document.getElementById("results").style.display = "none";
        }