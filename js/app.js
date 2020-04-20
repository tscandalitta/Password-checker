
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
        alert("Prueba, su password es: " + password);
        almacenarPassword(password);
    }
}

var keylocalStorage = "passwords";
function almacenarPassword(password) {  
        var pwdArray = getPasswords();
        if(pwdArray !== null) {
            pwdArray.push(password);
            localStorage.setItem(keylocalStorage, JSON.stringify(pwdArray));
        } else
            alert("El localStorage no está habilitado en su navegador");   
}

function getPasswords() {
    if (typeof(Storage) !== "undefined") {  
        var pwdArray = JSON.parse(localStorage.getItem(keylocalStorage));
        if(pwdArray == null)
            pwdArray = [];
        return pwdArray;
    }
    return null;
}


