
var iconoPasswordOculta = "far fa-eye-slash pwd-icon";
var iconoPasswordVisible = "far fa-eye pwd-icon";
var iconoPorDefecto = "fas fa-minus";
var iconoCruz = "fas fa-times";
var iconoCheck = "fas fa-check";
var iconoCheckDoble = "fas fa-check-double";
var iconoVerde = "icono-verde";
var iconoAmarillo = "icono-amarillo";
var iconoRojo = "icono-rojo";

var puntaje = new ParametroEntero("puntaje","Puntaje",0);
var longitud = new ParametroEntero("longitud","Longitud",0);
var cantMayusculas = new ParametroEntero("cantMayusculas","Letras mayúsculas",0);
var cantMinusculas = new ParametroEntero("cantMinusculas","Letras minúsculas",0);
var cantNumeros = new ParametroEntero("cantNumeros","Números",0);
var cantSimbolos = new ParametroEntero("cantSimbolos","Símbolos",0);
var soloLetras = new ParametroBooleano("soloLetras","Solo letras",false);
var soloNumeros = new ParametroBooleano("soloNumeros","Solo números",false);
var tieneSecuenciaLetras = new ParametroBooleano("tieneSecuenciaLetras","Secuencia de letras",false);
var tieneSecuenciaNumeros = new ParametroBooleano("tieneSecuenciaNumeros","Secuencia de números",false);
var tieneSecuenciaSimbolos = new ParametroBooleano("tieneSecuenciaSimbolos","Secuencia de símbolos",false);

var parametrosAFavor = [longitud,cantMayusculas,cantMinusculas,cantNumeros,cantSimbolos];

var parametrosEnContra = [soloLetras,soloNumeros,tieneSecuenciaLetras,tieneSecuenciaNumeros, 
                            tieneSecuenciaSimbolos];

$("#password-button").click(function(){
    checkPassword();
    $("#alert-resultado").show(600);
});

/**
 * Permite simular un click en el boton de validacion al presionar la tecla
 * Enter sobre el campo de entrada de la contraseña.
 */
document.querySelector("#password-input").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#password-button").click();
    event.preventDefault();
});

init();

function completarTablas() {
    var tablaPuntosFavorBody = document.getElementById("tabla-puntos-favor-body");
    var tablaPuntosContraBody = document.getElementById("tabla-puntos-contra-body");
    for(var i = 0; i < parametrosAFavor.length; i++){
        var parametro = parametrosAFavor[i];
        completarFila(tablaPuntosFavorBody,parametro.id,parametro.descripcion);
    }
    for(var i = 0; i < parametrosEnContra.length; i++){
        var parametro = parametrosEnContra[i];
        completarFila(tablaPuntosContraBody,parametro.id,parametro.descripcion);
    }
}

function completarFila(body, id, texto){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = texto;
    tr.appendChild(td);
    setIcon(tr);
    tr.setAttribute("id",id);
    body.appendChild(tr);
}

function actualizarTablas(){
    for(var i = 0; i < parametrosAFavor.length; i++){
        actualizarAux(parametrosAFavor[i]);
    }
    for(var i = 0; i < parametrosEnContra.length; i++){
        actualizarAux(parametrosEnContra[i]);
    }
}

function actualizarAux(parametro){
    var tr = document.getElementById(parametro.id);
    var span = tr.lastChild.firstChild;
    span.className = parametro.getColorIcono();
    var icon = span.firstChild;
    icon.className = parametro.getClaseIcono();
}

function actualizarTablaPasswords(){
    var tablaPasswordsBody = document.getElementById("tablaPasswordsBody");
    var pwdArray = getPasswords();
        if(pwdArray !== null) {
            while(tablaPasswordsBody.hasChildNodes()) {
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

function togglePassword() {
    var password = document.getElementById("password-input");
    var icon = document.getElementById("password-icon");
    if (password.type == "password") {
        password.type = "text";
        icon.className = iconoPasswordOculta;
    } else {
        password.type = "password";
        icon.className = iconoPasswordVisible;
    }
}

String.prototype.strReverse = function () {
	var newstring = "";
	for (var s = 0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
}

function setIcon(tr){
    var td = document.createElement('td');
    var span = document.createElement('span');
    var icon = document.createElement('i');
    icon.className = iconoPorDefecto;
    span.appendChild(icon);
    td.appendChild(span);
    tr.appendChild(td);
}

function init(){
    actualizarTablaPasswords();
    completarTablas();
}

function checkPassword() {
    var password = $("#password-input").val();
    if(password != "") {
        chkPass(password);
        storePassword(password);
        actualizarTablaPasswords();
        actualizarTablas();
    }
}

function chkPass(pwd) {
	// Simultaneous variable declaration and value assignment aren't supported in IE apparently
	// so I'm forced to assign the same value individually per var to support a crappy browser *sigh* 
    
    var puntajeP = 0; longitudP = 0; cantMayusculasP = 0, cantMinusculasP = 0, cantNumerosP = 0,
        cantSimbolosP = 0;
    var soloLetrasP = false, soloNumerosP = false, secuenciaSimbolosP = false,
        secuenciaLetrasP = false, secuenciaNumerosP = false;
	var	nConsecAlphaUC = 0, nConsecAlphaLC = 0,	nConsecNumber = 0,	nSeqAlpha = 0, nSeqNumber = 0,
        nSeqSymbol = 0;
    var nMultConsecAlphaUC = 2,	nMultConsecAlphaLC = 2,	nMultConsecNumber = 2;
	var nMultSeqAlpha = 3, nMultSeqNumber = 3, nMultSeqSymbol = 3;
	var nMultLength = nMultNumber = 4;
    var nMultSymbol = 6;

	var secuenciaLetras = "abcdefghijklmnopqrstuvwxyz";
	var secuenciaNumeros = "01234567890";
	var secuenciaSimbolos = ")!@#$%^&*()";
	var complejidad = "Muy débil";

    longitudP = pwd.length;
    puntajeP = longitudP * nMultLength;
    var arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);            //PRBAR SACAR EL REPLACE
    var arrPwdLen = arrPwd.length;

    /* Loop sobre la contraseña para buscar coincidencias de minúsculas, mayúsculas, numeros y simbolos */
    var nTmpAlphaUC = "", nTmpAlphaLC = "", nTmpNumber = "";
    for (var a = 0; a < arrPwdLen; a++) {
        if (arrPwd[a].match(/[A-Z]/g)) {                        //PROBAR SI PUEDO SACAR EL /G
            if (nTmpAlphaUC !== "") {
                if ((nTmpAlphaUC + 1) == a) {
                    nConsecAlphaUC++;
                }
            }
            nTmpAlphaUC = a;
            cantMayusculasP++;
        } else if (arrPwd[a].match(/[a-z]/g)) {                        //PROBAR SI PUEDO SACAR EL /G
            if (nTmpAlphaLC !== "") {
                if ((nTmpAlphaLC + 1) == a) {
                    nConsecAlphaLC++;
                }
            }
            nTmpAlphaLC = a;
            cantMinusculasP++;
        } else if (arrPwd[a].match(/[0-9]/g)) {                        //PROBAR SI PUEDO SACAR EL /G
            if (nTmpNumber !== "") {
                if ((nTmpNumber + 1) == a) {
                    nConsecNumber++;
                }
            }
            nTmpNumber = a;
            cantNumerosP++;
        } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {                        //PROBAR SI PUEDO SACAR EL /G
            cantSimbolosP++;
        }
    }

    /* Busca secuencias de letras (hacia adelante y hacia atras) */
    var pwdLowerCase = pwd.toLowerCase();
    for (var s = 0; s < 23; s++) {
        var sFwd = secuenciaLetras.substring(s, s+3);                  
        var sRev = sFwd.strReverse();
        if (pwdLowerCase.indexOf(sFwd) != -1 || pwdLowerCase.indexOf(sRev) != -1) {
            nSeqAlpha++;
        }
    }
    /* Busca secuencias de numeros (hacia adelante y hacia atras) */
    for (var s = 0; s < 8; s++) {
        var sFwd = secuenciaNumeros.substring(s, s+3);                   
        var sRev = sFwd.strReverse();
        if (pwd.indexOf(sFwd) != -1 || pwd.indexOf(sRev) != -1) {
            nSeqNumber++;
        }
    }
    /* Busca secuencias de simbolos (hacia adelante y hacia atras) */
    for (var s = 0; s < 8; s++) {
        var sFwd = secuenciaSimbolos.substring(s, s+3);                   
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
    if (nConsecAlphaUC > 0) { // Existen letras mayusculas consecutivas
        puntajeP -= (nConsecAlphaUC * nMultConsecAlphaUC);
        
    }
    if (nConsecAlphaLC > 0) { // Existen letras minusculas consecutivas
        puntajeP -= (nConsecAlphaLC * nMultConsecAlphaLC);
        
    }
    if (nConsecNumber > 0) { // Existen numeros consecutivos
        puntajeP -= (nConsecNumber * nMultConsecNumber);
        
    }
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

    /* Determina la complejidad basada en el puntaje general */
    if (puntajeP > 100) 
        puntajeP = 100;
    else if (puntajeP < 0) 
        puntajeP = 0;
    
    puntaje.valor = puntajeP;
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

    alert("Puntaje: "+puntajeP+", complejidad: "+complejidad);
}