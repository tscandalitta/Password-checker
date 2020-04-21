
var passwordsAlmacenadas = 5;
var keylocalStorage = "passwords";
var tablaPasswords = document.getElementById("tablaPasswords");
var tablaPasswordsBody = document.getElementById("tablaPasswordsBody");
actualizarTabla();

function actualizarTabla(){
    var pwdArray = getPasswords();
        if(pwdArray !== null) {
            while(tablaPasswordsBody.hasChildNodes()) {
                tablaPasswordsBody.removeChild(tablaPasswordsBody.firstChild);
            }
            for (var i in pwdArray) {
                var tr = document.createElement('TR');
                var td = document.createElement('TD');
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
        icon.className = "fa fa-eye-slash pwd-icon";
    } else {
        password.type = "password";
        icon.className = "fa fa-eye pwd-icon";
    }
}

function checkPassword() {
    var pwdInput = document.getElementById("password-input");
    var password = pwdInput.value;
    if(password != "") {
        checkStrenght(password);
        storePassword(password);
        actualizarTabla();
    }
}

function checkStrenght(password){
    alert("Prueba, su password es: " + password);
}


function storePassword(password) {  
        var pwdArray = getPasswords();
        if(pwdArray !== null) {
            pwdArray.push(password);
            if(pwdArray.length > passwordsAlmacenadas)
                pwdArray.shift();
            localStorage.setItem(keylocalStorage, JSON.stringify(pwdArray));
        } else
            alert("El localStorage no está habilitado en su navegador");   
}

/**
 * Devuelve un arreglo con las passwords almacenas en el localStorage
 * En caso de no poder acceder al almacenamiento, retorna null
 */
function getPasswords() {
    if (typeof(Storage) !== "undefined") {  
        var pwdArray = JSON.parse(localStorage.getItem(keylocalStorage));
        if(pwdArray == null)
            pwdArray = [];
        return pwdArray;
    }
    return null;
}


