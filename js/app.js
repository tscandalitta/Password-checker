
var passwordsAlmacenadas = 5;
var keylocalStorage = "passwords";
var tablaPasswords = document.getElementById("tablaPasswords");
var tablaPasswordsBody = document.getElementById("tablaPasswordsBody");
init();

/**
 * Permite simular un click en el boton de validacion al presionar la tecla
 * Enter sobre el campo de entrada de la contraseña.
 */
document.querySelector("#password-input").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#password-button").click();
    event.preventDefault();
});

function init(){
    actualizarTablaPasswords();
}

function actualizarTablaPasswords(){
    var pwdArray = getPasswords();
        if(pwdArray !== null) {
            while(tablaPasswordsBody.hasChildNodes()) {
                tablaPasswordsBody.removeChild(tablaPasswordsBody.firstChild);
            }
            for (var i = pwdArray.length - 1; i >= 0; i--) {
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
        actualizarTablaPasswords();
    }
}

function checkStrenght(password){
    alert("Prueba, su password es: " + password);
}


function storePassword(password) {  
        var pwdArray = getPasswords();
        if(pwdArray !== null) {
            insertar(pwdArray,password);
            localStorage.setItem(keylocalStorage, JSON.stringify(pwdArray));
        } else
            alert("El localStorage no está habilitado en su navegador");   
}

/**
 * Almacena la contraseña en el arreglo. 
 * Si se achica el tamaño del arreglo, pueden quedar contraseñas almacenadas de más
 * en el localStorage por lo que las elimina hasta cumplir con el tamaño deseado.
 * @param {array} array - arreglo de contraseñas
 * @param {string} password - contraseña a almacenar en el arreglo 
 */
function insertar(array, password) {
    array.push(password);
    while(array.length > passwordsAlmacenadas)
        array.shift();
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


