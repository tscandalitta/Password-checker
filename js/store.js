
const keylocalStorage = "passwords";
const passwordsAlmacenadas = 5;

/**
 * Almancena la contraseña en el localStorage del navegador
 * @param {string} password - contraseña a almancenar
 */
function storePassword(password) {  
    let pwdArray = getPasswords();
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
        let pwdArray = JSON.parse(localStorage.getItem(keylocalStorage));
        if(pwdArray == null)
            pwdArray = [];
        return pwdArray;
    }
    return null;
}