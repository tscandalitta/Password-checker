
var iconoPasswordOculta = "far fa-eye-slash pwd-icon";
var iconoPasswordVisible = "far fa-eye pwd-icon";
var iconoPorDefecto = "fas fa-minus";

class Parametro {
    constructor(id, descripcion, valor) {
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
    }
}

var puntaje = new Parametro("puntaje","Puntaje",0);
var longitud = new Parametro("longitud","Longitud",0);
var cantMayusculas = new Parametro("cantMayusculas","Letras mayúsculas",0);
var cantMinusculas = new Parametro("cantMinusculas","Letras minúsculas",0);
var cantNumeros = new Parametro("cantNumeros","Números",0);
var cantSimbolos = new Parametro("cantSimbolos","Símbolos",0);
var soloLetras = new Parametro("soloLetras","Solo letras",false);
var soloNumeros = new Parametro("soloNumeros","Solo números",false);
var tieneSecuenciaLetras = new Parametro("tieneSecuenciaLetras","Secuencia de letras",false);
var tieneSecuenciaNumeros = new Parametro("tieneSecuenciaNumeros","Secuencia de números",false);
var tieneSecuenciaSimbolos = new Parametro("tieneSecuenciaSimbolos","Secuencia de símbolos",false);

var parametrosAFavor = [longitud,cantMayusculas,cantMinusculas,cantNumeros,cantSimbolos];

var parametrosEnContra = [soloLetras,soloNumeros,tieneSecuenciaLetras,tieneSecuenciaNumeros, 
                            tieneSecuenciaSimbolos];

const NOCUMPLE = 0;
const REGULAR = 1;
const BUENO = 2;
const MUYBUENO = 3;

$("#password-button").click(function(){
    checkPassword();
    $("#alert-resultado").show(600);
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
    tr.className = "disabled";
    body.appendChild(tr);
}

function actualizarTablaFavor(){
    for(var i = 0; i < parametrosAFavor.length; i++){
        var parametro = parametrosAFavor[i];
        var tr = document.getElementById(parametro);
        var clase = "disabled";
        var iconClass = "fas fa-minus";
        var spanClass = "";
        if (valores[parametro] != NOCUMPLE){
            clase = "";
            iconClass = "fas fa-check";
            if(valores[parametro] == REGULAR)
                spanClass = "icono-amarillo";
            else 
                spanClass = "icono-verde";
            if(valores[parametro] == MUYBUENO)
                iconClass = "fas fa-check-double";
        }
        var span = tr.lastChild.firstChild;
        span.className = spanClass;
        var icon = span.firstChild;
        icon.className = iconClass;
        tr.className = clase;
    }
}

function actualizarTablaContra(){
    for(var i = 0; i < parametrosEnContra.length; i++){
        var parametro = parametrosEnContra[i];
        var tr = document.getElementById(parametro);
        var clase = "disabled";
        var iconClass = "fas fa-minus";
        var spanClass = "";
        if (booleanos[parametro]){
            clase = "";
            iconClass = "fas fa-times";
            spanClass = "icono-rojo";
        }
        var span = tr.lastChild.firstChild;
        span.className = spanClass;
        var icon = span.firstChild;
        icon.className = iconClass;
        tr.className = clase;
    }
}
/**
 * Permite simular un click en el boton de validacion al presionar la tecla
 * Enter sobre el campo de entrada de la contraseña.
 */
document.querySelector("#password-input").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#password-button").click();
    event.preventDefault();
});


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

function checkPassword() {
    var password = $("#password-input").val();
    if(password != "") {
        chkPass(password);
        storePassword(password);
        actualizarTablaPasswords();
        actualizarTablaFavor();
        actualizarTablaContra();
    }
}

String.prototype.strReverse = function () {
	var newstring = "";
	for (var s = 0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
};

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

    var nTmpAlphaUC = "", nTmpAlphaLC = "", nTmpNumber = "";

	var secuenciaLetras = "abcdefghijklmnopqrstuvwxyz";
	var secuenciaNumeros = "01234567890";
	var secuenciaSimbolos = ")!@#$%^&*()";
	var complejidad = "Muy débil";

    longitudP = pwd.length;
    puntajeP = parseInt(longitudP * nMultLength);                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
    var arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);            //PRBAR SACAR EL REPLACE
    var arrPwdLen = arrPwd.length;

    /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
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
        var sFwd = secuenciaLetras.substring(s, parseInt(s + 3));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
        var sRev = sFwd.strReverse();
        if (pwdLowerCase.indexOf(sFwd) != -1 || pwdLowerCase.indexOf(sRev) != -1) {
            nSeqAlpha++;
        }
    }
    /* Busca secuencias de numeros (hacia adelante y hacia atras) */
    for (var s = 0; s < 8; s++) {
        var sFwd = secuenciaNumeros.substring(s, parseInt(s + 3));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
        var sRev = sFwd.strReverse();
        if (pwd.indexOf(sFwd) != -1 || pwd.indexOf(sRev) != -1) {
            nSeqNumber++;
        }
    }

    /* Busca secuencias de simbolos (hacia adelante y hacia atras) */
    for (var s = 0; s < 8; s++) {
        var sFwd = secuenciaSimbolos.substring(s, parseInt(s + 3));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
        var sRev = sFwd.strReverse();
        if (pwd.indexOf(sFwd) != -1 || pwd.indexOf(sRev) != -1) {
            nSeqSymbol++;
        }
    }


    /* Asignacion de puntajes */

    if (cantMayusculasP > 0 && cantMayusculasP < longitudP) {
        puntajeP = parseInt(puntajeP + ((longitudP - cantMayusculasP) * 2));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
    }
    if (cantMinusculasP > 0 && cantMinusculasP < longitudP) {
        puntajeP = parseInt(puntajeP + ((longitudP - cantMinusculasP) * 2));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
    }
    if (cantNumerosP > 0 && cantNumerosP < longitudP) {
        puntajeP = parseInt(puntajeP + (cantNumerosP * nMultNumber));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
    }
    if (cantSimbolosP > 0) {
        puntajeP = parseInt(puntajeP + (cantSimbolosP * nMultSymbol));                   //PROBAR SI SE PUEDE SACAR EL PARSEINT
    }


    /* Reduccion de puntajeP debido a malas practicas */

    if ((cantMinusculasP > 0 || cantMayusculasP > 0) && cantSimbolosP === 0 && cantNumerosP === 0) { // Solo letras
        puntajeP = parseInt(puntajeP - longitudP);
        soloLetrasP = true;
    }
    if (cantMinusculasP === 0 && cantMayusculasP === 0 && cantSimbolosP === 0 && cantNumerosP > 0) { // Solo numeros
        puntajeP = parseInt(puntajeP - longitudP);
        soloNumerosP = true;
    }
    if (nConsecAlphaUC > 0) { // Existen letras mayusculas consecutivas
        puntajeP = parseInt(puntajeP - (nConsecAlphaUC * nMultConsecAlphaUC));
        
    }
    if (nConsecAlphaLC > 0) { // Existen letras minusculas consecutivas
        puntajeP = parseInt(puntajeP - (nConsecAlphaLC * nMultConsecAlphaLC));
        
    }
    if (nConsecNumber > 0) { // Existen numeros consecutivos
        puntajeP = parseInt(puntajeP - (nConsecNumber * nMultConsecNumber));
        
    }
    if (nSeqAlpha > 0) { // Existen secuencias de letras (3 caracteres o mas)
        puntajeP = parseInt(puntajeP - (nSeqAlpha * nMultSeqAlpha));
        secuenciaLetrasP = true;
    }
    if (nSeqNumber > 0) { // Existen secuencias de numeros (3 caracteres o mas)
        puntajeP = parseInt(puntajeP - (nSeqNumber * nMultSeqNumber));
        secuenciaNumerosP = true;
    }
    if (nSeqSymbol > 0) { // Existen secuencias de simbolos (3 caracteres o mas)
        puntajeP = parseInt(puntajeP - (nSeqSymbol * nMultSeqSymbol));
        secuenciaSimbolosP = true;
    }


    /* Determina la complejidad basada en el puntaje general */

    if (puntajeP > 100) 
        puntajeP = 100;
    else if (puntajeP < 0) 
        puntajeP = 0;
    
    if (puntajeP < 20)
        complejidad = "Muy débil";
    else if (puntajeP < 40)
        complejidad = "Débil";
    else if (puntajeP < 60)
        complejidad = "Regular";
    else if (puntajeP < 80)
        complejidad = "Fuerte";
    else
        complejidad = "Muy fuerte";
        
    alert("puntajeP: "+ puntajeP +", complejidad: "+ complejidad);

    /* Mapea los valores de los parametros a REGULAR - BUENO - MUYBUENO */

    if (longitudP <= 8)
        valores[longitud] = REGULAR;
    else if (longitudP <= 12)
        valores[longitud] = BUENO;
    else 
        valores[longitud] = MUYBUENO;

    if(cantMayusculasP > 0){
        if (cantMayusculasP == 1)
            valores[cantMayusculas] = REGULAR;
        else if (cantMayusculasP == 2)
            valores[cantMayusculas] = BUENO;
        else 
            valores[cantMayusculas] = MUYBUENO;
    }

    if (cantMinusculasP > 0){
        if (cantMinusculasP <= 2)
            valores[cantMinusculas] = REGULAR;
        else if (cantMinusculasP <= 4)
            valores[cantMinusculas] = BUENO;
        else 
            valores[cantMinusculas] = MUYBUENO;
    }

    if(cantNumerosP > 0){
        if (cantNumerosP == 1)
            valores[cantNumeros] = REGULAR;
        else if (cantNumerosP == 2)
            valores[cantNumeros] = BUENO;
        else 
            valores[cantNumeros] = MUYBUENO;
    }

    if(cantSimbolosP > 0){
        if (cantSimbolosP == 1)
            valores[cantSimbolos] = REGULAR;
        else if (cantSimbolosP == 2)
            valores[cantSimbolos] = BUENO;
        else 
            valores[cantSimbolos] = MUYBUENO;
    }

    booleanos[soloLetras] = soloLetrasP;
    booleanos[soloNumeros] = soloNumerosP;
    booleanos[tieneSecuenciaSimbolos] = secuenciaSimbolosP;
    booleanos[tieneSecuenciaLetras] = secuenciaLetrasP;
    booleanos[tieneSecuenciaNumeros] = secuenciaNumerosP;
}