(function () {
    var iconoAmarillo = "icono-amarillo";
    var iconoGrisOscuro = "icono-gris-oscuro";

    $("#icono-tema").click(function () {
        $(this).toggleClass("fa-moon fa-sun");
        $("#span-tema").toggleClass(iconoAmarillo + " " + iconoGrisOscuro);
        resetTheme();
    });
    initTheme();

    function initTheme() {
        var darkThemeSelected =
            localStorage.getItem("darkSwitch") !== null &&
            localStorage.getItem("darkSwitch") === "dark";

        if (darkThemeSelected) {
            document.body.setAttribute("data-theme", "dark");
            $("#span-tema").addClass(iconoAmarillo);
            $("#icono-tema").addClass("fa-sun");
        } else {
            document.body.removeAttribute("data-theme");
            $("#span-tema").addClass(iconoGrisOscuro);
            $("#icono-tema").addClass("fa-moon");
        }            
        actualizarColores();
    }

    function resetTheme() {
        if ($("body").attr("data-theme") === "dark") {
            document.body.removeAttribute("data-theme");
            localStorage.removeItem("darkSwitch");
        } else {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("darkSwitch", "dark");
        }
        actualizarColores();
    }

    function actualizarColores() {
        if (document.body.getAttribute("data-theme") === "dark") {
            $("table").addClass("table-dark");
            $("thead").removeClass("thead-light");
        } else {
            $("table").removeClass("table-dark");
            $("thead").addClass("thead-light");
        }
    }
})();