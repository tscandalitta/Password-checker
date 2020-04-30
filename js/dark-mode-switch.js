(function() {
    var darkSwitch = document.getElementById("darkSwitch");
    if (darkSwitch) {
        initTheme();
        darkSwitch.addEventListener("change", function(event) {
            resetTheme();
        });
        function initTheme() {
            var darkThemeSelected =
                localStorage.getItem("darkSwitch") !== null &&
                localStorage.getItem("darkSwitch") === "dark";
            darkSwitch.checked = darkThemeSelected;
            darkThemeSelected
                ? document.body.setAttribute("data-theme", "dark")
                : document.body.removeAttribute("data-theme");
            actualizarColores();
        }
        function resetTheme() {
            if (darkSwitch.checked) {
                document.body.setAttribute("data-theme", "dark");
                localStorage.setItem("darkSwitch", "dark");
            } else {
                document.body.removeAttribute("data-theme");
                localStorage.removeItem("darkSwitch");
            }
            actualizarColores();
        }
    }
})();

function actualizarColores() {
    if(document.body.getAttribute("data-theme") === "dark") {
        $("table").addClass("table-dark");
        $("thead").removeClass("thead-light");
    } 
    else {
        $("table").removeClass("table-dark");
        $("thead").addClass("thead-light");
    }
}
