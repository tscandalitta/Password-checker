function togglePassword() {
    var pwd = document.getElementById("password-input");
    var icon = document.getElementById("password-icon");
    if (pwd.type === "password") {
      pwd.type = "text";
      icon.className = "fa fa-eye-slash pwd-icon";
    } else {
      pwd.type = "password";
      icon.className = "fa fa-eye pwd-icon";
    }
  }