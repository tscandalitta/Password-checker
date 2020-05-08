var iconoPasswordOculta = "far fa-eye-slash pwd-icon";
var iconoPasswordVisible = "far fa-eye pwd-icon";
var iconoPorDefecto = "fas fa-minus";
var iconoCruz = "fas fa-times";
var iconoCheck = "fas fa-check";
var iconoCheckDoble = "fas fa-check-double";
var iconoVerde = "icono-verde";
var iconoAmarillo = "icono-amarillo";
var iconoRojo = "icono-rojo";
var disabled = "disabled";
var alertSuccess = "alert alert-success";
var alertDanger = "alert alert-danger";
var alertWarning = "alert alert-warning";

var puntaje = 0;
var longitud = new ParametroLongitud("longitud", "Longitud", 0);
var cantMayusculas = new ParametroEntero("cantMayusculas", "Letras mayúsculas", 0);
var cantMinusculas = new ParametroEntero("cantMinusculas", "Letras minúsculas", 0);
var cantNumeros = new ParametroEntero("cantNumeros", "Números", 0);
var cantSimbolos = new ParametroEntero("cantSimbolos", "Símbolos", 0);
var soloLetras = new ParametroBooleano("soloLetras", "Solo letras", false);
var soloNumeros = new ParametroBooleano("soloNumeros", "Solo números", false);
var tieneSecuenciaLetras = new ParametroBooleano("tieneSecuenciaLetras", "Secuencia de letras", false);
var tieneSecuenciaNumeros = new ParametroBooleano("tieneSecuenciaNumeros", "Secuencia de números", false);
var tieneSecuenciaSimbolos = new ParametroBooleano("tieneSecuenciaSimbolos", "Secuencia de símbolos", false);

var parametrosAFavor = [
    longitud, cantMayusculas, cantMinusculas, cantNumeros, cantSimbolos
];

var parametrosEnContra = [
    soloLetras, soloNumeros, tieneSecuenciaLetras, tieneSecuenciaNumeros,
    tieneSecuenciaSimbolos
];

document.getElementById("password-input").addEventListener("input", checkPassword);

$("#password-button").click(function () {
    var password = $("#password-input").val();
    if (password != "") {
        storePassword(password);
        actualizarTablaPasswords();
    }
});

$("#password-icon").click(function () {
    togglePassword();
});

init();

function togglePassword() {
    var password = document.getElementById("password-input");
    var icon = document.getElementById("password-icon");
    if (password.type == "password") {
        password.type = "text";
        icon.className = iconoPasswordOculta;
        icon.setAttribute("title","Ocultar contraseña");
    } else {
        password.type = "password";
        icon.className = iconoPasswordVisible;
        icon.setAttribute("title","Mostrar contraseña");
    }
}

function completarTablas() {
    var tablaPuntosFavorBody = document.getElementById("tabla-puntos-favor-body");
    var tablaPuntosContraBody = document.getElementById("tabla-puntos-contra-body");
    completarTabla(parametrosAFavor, tablaPuntosFavorBody);
    completarTabla(parametrosEnContra, tablaPuntosContraBody);

}

function actualizarTablas() {
    actualizarValores(parametrosAFavor);
    actualizarValores(parametrosEnContra);
}

function checkPassword() {
    var password = $("#password-input").val();
    chkPass(password);
    mostrarResultado(password, puntaje);
    actualizarTablas();
}

function init() {
    actualizarTablaPasswords();
    completarTablas();
}


/******************************* MANEJO DE TABLAS ****************************/
function completarTabla(parametros, body) {
    for (var i = 0; i < parametros.length; i++) {
        var parametro = parametros[i];
        completarFila(body, parametro.getId(), parametro.getDescripcion());
    }
}

function completarFila(body, id, texto) {
    var tr = document.createElement('tr');
    var tdDescripcion = document.createElement('td');
    tdDescripcion.innerHTML = texto;
    tr.appendChild(tdDescripcion);
    var tdIcono = document.createElement('td');
    tdIcono.className = "td-align-right";
    setIcon(tdIcono);
    tr.appendChild(tdIcono);
    tr.setAttribute("id", id);
    tr.className = disabled
    body.appendChild(tr);
}

function setIcon(td) {
    var span = document.createElement('span');
    var icon = document.createElement('i');
    icon.className = iconoPorDefecto;
    span.appendChild(icon);
    td.appendChild(span);
}

function actualizarValores(parametros) {
    for (var i = 0; i < parametros.length; i++) {
        var parametro = parametros[i];
        var tr = document.getElementById(parametro.id);
        var span = tr.lastChild.firstChild;
        span.className = parametro.getColorIcono();
        var icon = span.firstChild;
        icon.className = parametro.getClaseIcono();
        tr.className = (icon.className == iconoPorDefecto) ? disabled : "";
    }
}

function actualizarTablaPasswords() {
    var tablaPasswordsBody = document.getElementById("tablaPasswordsBody");
    var pwdArray = getPasswords();
    if (pwdArray !== null) {
        while (tablaPasswordsBody.hasChildNodes()) {
            tablaPasswordsBody.removeChild(tablaPasswordsBody.firstChild);
        }
        for (var i = pwdArray.length - 1; i >= 0; i--) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(pwdArray[i]));
            tr.appendChild(td);
            tablaPasswordsBody.appendChild(tr);
        }
    }
}
/*****************************************************************************/


/*********************************** ALERT ***********************************/
function mostrarResultado(password, puntaje) {
    if (password != "") {
        var colorAlert = getColorAlert(puntaje);
        var complejidad = getComplejidad(puntaje);
        $("#alert-complejidad").text(complejidad);
        $("#alert-puntaje").text(puntaje);
        $("#titulo-alert").text(getTituloAlert(puntaje));
        $("#alert-resultado").show(500);
        $("#alert-resultado").removeClass().addClass(colorAlert);
    } else
        $("#alert-resultado").hide(500);
}

function getTituloAlert(puntaje) {
    if (puntaje <= 60)
        return "Puedes hacerlo mejor!";
    else
        return "Bien hecho!";
}

function getColorAlert(puntaje) {
    var color = alertDanger;
    if (puntaje > 40) {
        if (puntaje <= 60)
            color = alertWarning;
        else
            color = alertSuccess;
    }
    return color;
}

function getComplejidad(puntaje) {
    var complejidad = "muy insegura";
    if (puntaje > 20) {
        if (puntaje <= 40)
            complejidad = "insegura";
        else if (puntaje <= 60)
            complejidad = "poco segura";
        else if (puntaje <= 80)
            complejidad = "segura";
        else
            complejidad = "muy segura";
    }
    return complejidad;
}
/*****************************************************************************/


/******************************* CHECK PASSWORD ******************************/
String.prototype.strReverse = function () {
    var newstring = "";
    for (var s = 0; s < this.length; s++) {
        newstring = this.charAt(s) + newstring;
    }
    return newstring;
}

function chkPass(pwd) {

    var puntajeP = 0;
    longitudP = 0;
    cantMayusculasP = 0, cantMinusculasP = 0, cantNumerosP = 0,
        cantSimbolosP = 0;
    var soloLetrasP = false,
        soloNumerosP = false,
        secuenciaSimbolosP = false,
        secuenciaLetrasP = false,
        secuenciaNumerosP = false;

    if (pwd != "") {
        var nConsecAlpha = 0,
            nConsecNumber = 0,
            nConsecSymbol = 0,
            nSeqAlpha = 0,
            nSeqNumber = 0,
            nSeqSymbol = 0;
        var nMultConsecChar = 2;
        var nMultSeqAlpha = 3,
            nMultSeqNumber = 3,
            nMultSeqSymbol = 3;
        var nMultLength = nMultNumber = 4;
        var nMultSymbol = 6;

        var secuenciaLetras = "abcdefghijklmnopqrstuvwxyz";
        var secuenciaNumeros = "01234567890";
        var secuenciaSimbolos = ")!@#$%^&*()";

        longitudP = pwd.length;
        puntajeP = longitudP * nMultLength;
        var arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
        var arrPwdLen = arrPwd.length;

        /* Loop sobre la contraseña para buscar coincidencias de minúsculas, mayúsculas, numeros y simbolos */
        var nTmpAlphaUC = "",
            nTmpAlphaLC = "",
            nTmpNumber = "",
            nTmpSymbol = "";
        for (var a = 0; a < arrPwdLen; a++) {
            if (arrPwd[a].match(/[A-Z]/g)) {
                if (nTmpAlphaUC !== "") {
                    if ((nTmpAlphaUC + 1) == a) {
                        nConsecAlpha++;
                    }
                }
                nTmpAlphaUC = a;
                cantMayusculasP++;
            } else if (arrPwd[a].match(/[a-z]/g)) {
                if (nTmpAlphaLC !== "") {
                    if ((nTmpAlphaLC + 1) == a) {
                        nConsecAlpha++;
                    }
                }
                nTmpAlphaLC = a;
                cantMinusculasP++;
            } else if (arrPwd[a].match(/[0-9]/g)) {
                if (nTmpNumber !== "") {
                    if ((nTmpNumber + 1) == a) {
                        nConsecNumber++;
                    }
                }
                nTmpNumber = a;
                cantNumerosP++;
            } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
                if (nTmpSymbol !== "") {
                    if ((nTmpSymbol + 1) == a) {
                        nConsecSymbol++;
                    }
                }
                nTmpSymbol = a;
                cantSimbolosP++;
            }
        }

        /* Busca secuencias de letras (hacia adelante y hacia atras) */
        var pwdLowerCase = pwd.toLowerCase();
        for (var s = 0; s < 23; s++) {
            var sFwd = secuenciaLetras.substring(s, s + 3);
            var sRev = sFwd.strReverse();
            if (pwdLowerCase.indexOf(sFwd) != -1 || pwdLowerCase.indexOf(sRev) != -1) {
                nSeqAlpha++;
            }
        }
        /* Busca secuencias de numeros (hacia adelante y hacia atras) */
        for (var s = 0; s < 8; s++) {
            var sFwd = secuenciaNumeros.substring(s, s + 3);
            var sRev = sFwd.strReverse();
            if (pwd.indexOf(sFwd) != -1 || pwd.indexOf(sRev) != -1) {
                nSeqNumber++;
            }
        }
        /* Busca secuencias de simbolos (hacia adelante y hacia atras) */
        for (var s = 0; s < 8; s++) {
            var sFwd = secuenciaSimbolos.substring(s, s + 3);
            var sRev = sFwd.strReverse();
            if (pwd.indexOf(sFwd) != -1 || pwd.indexOf(sRev) != -1) {
                nSeqSymbol++;
            }
        }

        /* Asignacion de puntajes */
        if (cantMayusculasP > 0 && cantMayusculasP < longitudP) {
            puntajeP += ((longitudP - cantMayusculasP) * 2);
        }
        if (cantMinusculasP > 0 && cantMinusculasP < longitudP) {
            puntajeP += ((longitudP - cantMinusculasP) * 2);
        }
        if (cantNumerosP > 0 && cantNumerosP < longitudP) {
            puntajeP += (cantNumerosP * nMultNumber);
        }
        if (cantSimbolosP > 0) {
            puntajeP += (cantSimbolosP * nMultSymbol);
        }

        /* Reduccion de puntaje debido a malas practicas */
        if ((cantMinusculasP > 0 || cantMayusculasP > 0) && cantSimbolosP === 0 && cantNumerosP === 0) { // Solo letras
            puntajeP -= longitudP;
            soloLetrasP = true;
        }
        if (cantMinusculasP === 0 && cantMayusculasP === 0 && cantSimbolosP === 0 && cantNumerosP > 0) { // Solo numeros
            puntajeP -= longitudP;
            soloNumerosP = true;
        }

        puntajeP -= (nConsecAlpha + nConsecNumber + nConsecSymbol) * nMultConsecChar; // Hay caracteres consecutivos
        
        if (nSeqAlpha > 0) { // Existen secuencias de letras (3 caracteres o mas)
            puntajeP -= (nSeqAlpha * nMultSeqAlpha);
            secuenciaLetrasP = true;
        }
        if (nSeqNumber > 0) { // Existen secuencias de numeros (3 caracteres o mas)
            puntajeP -= (nSeqNumber * nMultSeqNumber);
            secuenciaNumerosP = true;
        }
        if (nSeqSymbol > 0) { // Existen secuencias de simbolos (3 caracteres o mas)
            puntajeP -= (nSeqSymbol * nMultSeqSymbol);
            secuenciaSimbolosP = true;
        }

        if (puntajeP > 100)
            puntajeP = 100;
        else if (puntajeP < 0)
            puntajeP = 0;
    }

    puntaje = puntajeP;
    longitud.valor = longitudP;
    cantMayusculas.valor = cantMayusculasP;
    cantMinusculas.valor = cantMinusculasP;
    cantNumeros.valor = cantNumerosP;
    cantSimbolos.valor = cantSimbolosP;
    soloLetras.valor = soloLetrasP;
    soloNumeros.valor = soloNumerosP;
    tieneSecuenciaSimbolos.valor = secuenciaSimbolosP;
    tieneSecuenciaLetras.valor = secuenciaLetrasP;
    tieneSecuenciaNumeros.valor = secuenciaNumerosP;
}