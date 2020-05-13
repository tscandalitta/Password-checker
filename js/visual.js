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
            var tdPassword = document.createElement('td');
            var tdPuntaje = document.createElement('td');
            tdPassword.appendChild(document.createTextNode(pwdArray[i].password));
            tdPuntaje.appendChild(document.createTextNode(pwdArray[i].puntaje + "/100"));
            tdPuntaje.className = "td-align-right";
            tr.appendChild(tdPassword);
            tr.appendChild(tdPuntaje);
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