//Login Variables
var loginEmail = document.getElementById("logEmail");
var loginPassword = document.getElementById("logPassword");
var loginBtn = document.getElementById("login");
var loginKeyPressBtn = document.getElementById("loginKeyPress");

// Sign Up Variables
var userName = document.getElementById("userName");
var signUpEmail = document.getElementById("signEmail");
var signUpPassword = document.getElementById("signPassword");
var signUpBtn = document.getElementById("SignUp");
var signUpKeyPressBtn = document.getElementById("signUpKeyPress");

//misc
var warnName = document.getElementById("warnName");
var warnEmail = document.getElementById("warnEmail");
var warnPassword = document.getElementById("warnPassword");
var logCheck = document.getElementById("logCheck");
var passCheck = document.getElementById("passCheck");
var emailCheck = document.getElementById("emailCheck");
var emptyCheck = document.getElementById("emptyCheck");
var logoutBtn = document.getElementById("logout");
var closeEmailCheckBtn = document.getElementById("closeEmailCheck");
var EmailCheck = document.getElementById("EmailCheck");

// Regex
var nameRegex = /^[a-zA-Z]{3,}$/;
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

// Data Base
var dataBase = [];

// Local Storage
if (localStorage.getItem("logins") != null) {
  dataBase = JSON.parse(localStorage.getItem("logins"));
}

// Welcome Message
var username = localStorage.getItem("currentUser");
if (username) {
  document.getElementById("MSG").innerHTML = "welcome " + username;
}

// Sign Up function
function signUp() {
  var logins = {
    Name: userName.value,
    Email: signUpEmail.value,
    Password: signUpPassword.value,
  };

  var emailExists = dataBase.some(function (SignUp) {
    return SignUp.Email.toLowerCase() === signUpEmail.value.toLowerCase();
  });

  if (emailExists) {
    emailCheck.classList.replace("d-none", "d-flex");
    signUpEmail.focus();
    // console.log("This Email already exists!");
  } else if (
    userName.value === "" ||
    signUpEmail.value === "" ||
    signUpPassword.value === ""
  ) {
    emptyCheck.classList.replace("d-none", "d-block");
  } else if (userName.classList.contains("is-invalid")) {
    userName.focus();
    return;
  } else if (signUpEmail.classList.contains("is-invalid")) {
    signUpEmail.focus();
    return;
  } else if (signUpPassword.classList.contains("is-invalid")) {
    signUpPassword.focus();
    return;
  } else if (
    nameRegex.test(userName.value) &&
    emailRegex.test(signUpEmail.value) &&
    passwordRegex.test(signUpPassword.value)
  ) {
    dataBase.push(logins);
    localStorage.setItem("logins", JSON.stringify(dataBase));
    clearForm();
    userName.classList.remove("is-valid");
    signUpEmail.classList.remove("is-valid");
    signUpPassword.classList.remove("is-valid");
    window.location.href = "index.html";
  }
}

// login function
function login() {
  for (var i = 0; i < dataBase.length; i++) {
    if (
      loginEmail.value.toLowerCase() === dataBase[i].Email.toLowerCase() &&
      loginPassword.value === dataBase[i].Password
    ) {
      passCheck.classList.replace("d-block", "d-none");
      logCheck.classList.replace("d-block", "d-none");
      loginEmail.value = "";
      loginPassword.value = "";
      localStorage.setItem("currentUser", dataBase[i].Name);
      window.location.href = "Welcome.html";
    } else if (
      !dataBase[i].Email.toLowerCase().includes(loginEmail.value.toLowerCase())
    ) {
      EmailCheck.classList.replace("d-none", "d-block");
      passCheck.classList.replace("d-block", "d-none");
      logCheck.classList.replace("d-block", "d-none");
    } else if (
      !dataBase[i].Email.toLowerCase().includes(
        loginEmail.value.toLowerCase()
      ) &&
      !dataBase[i].Password.includes(loginPassword.value)
    ) {
      passCheck.classList.replace("d-block", "d-none");
      logCheck.classList.replace("d-none", "d-block");
      EmailCheck.classList.replace("d-block", "d-none");
    } else if (
      loginEmail.value.toLowerCase() == dataBase[i].Email.toLowerCase() &&
      !dataBase[i].Password.includes(loginPassword.value)
    ) {
      passCheck.classList.replace("d-none", "d-block");
      EmailCheck.classList.replace("d-block", "d-none");
      logCheck.classList.replace("d-block", "d-none");
    } else if (loginEmail.value === "" || loginPassword.value === "") {
      passCheck.classList.replace("d-block", "d-none");
      logCheck.classList.replace("d-block", "d-none");
      EmailCheck.classList.replace("d-block", "d-none");
    }
  }
}
// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// clear form
function clearForm() {
  userName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}

// Event Listeners for Sign Up
if (window.location.pathname.endsWith("/SignUp.html")) {
  userName.addEventListener("input", function () {
    if (nameRegex.test(userName.value)) {
      userName.classList.add("is-valid");
      userName.classList.remove("is-invalid");
      warnName.classList.replace("d-block", "d-none");
    } else if (userName.value === "") {
      userName.classList.remove("is-valid");
      userName.classList.remove("is-invalid");
      warnName.classList.replace("d-block", "d-none");
    } else {
      userName.classList.add("is-invalid");
      warnName.classList.replace("d-none", "d-block");
      userName.classList.remove("is-valid");
    }
  });

  signUpEmail.addEventListener("input", function () {
    if (emailRegex.test(signUpEmail.value)) {
      signUpEmail.classList.add("is-valid");
      signUpEmail.classList.remove("is-invalid");
      warnEmail.classList.replace("d-block", "d-none");
    } else if (signUpEmail.value === "") {
      signUpEmail.classList.remove("is-valid");
      signUpEmail.classList.remove("is-invalid");
      warnEmail.classList.replace("d-block", "d-none");
    } else {
      signUpEmail.classList.add("is-invalid");
      signUpEmail.classList.remove("is-valid");
      warnEmail.classList.replace("d-none", "d-block");
    }
  });

  signUpPassword.addEventListener("input", function () {
    if (passwordRegex.test(signUpPassword.value)) {
      signUpPassword.classList.add("is-valid");
      signUpPassword.classList.remove("is-invalid");
      warnPassword.classList.replace("d-block", "d-none");
    } else if (signUpPassword.value === "") {
      signUpPassword.classList.remove("is-valid");
      signUpPassword.classList.remove("is-invalid");
      warnPassword.classList.replace("d-block", "d-none");
    } else {
      signUpPassword.classList.add("is-invalid");
      signUpPassword.classList.remove("is-valid");
      warnPassword.classList.replace("d-none", "d-block");
    }
  });

  function signUpKeyPress(e) {
    if (e.key === "Enter") {
      signUp();
    }
  }

  signUpKeyPressBtn.addEventListener("keypress", signUpKeyPress);
  signUpBtn.addEventListener("click", signUp);
  closeEmailCheckBtn.addEventListener("click", closeEmailCheck);
}

// Event Listeners for Login
if (
  window.Location.pathname === `/` ||
  window.location.pathname.endsWith(`/index.html`) ||
  window.location.pathname.endsWith(`/`)
) {
  function loginKeyPress(e) {
    if (e.key === "Enter") {
      login();
    }
  }
  loginKeyPressBtn.addEventListener("keypress", loginKeyPress);
  loginBtn.addEventListener("click", login);
}

// Event Listeners for Logout
if (window.location.pathname.endsWith(`/Welcome.html`)) {
  logoutBtn.addEventListener("click", logout);
}

if (window.location.pathname.endsWith(`/Welcome.html`)) {
  if (!localStorage.getItem("currentUser")) {
    caches.delete(`/Welcome.html`);
    // .then(() => {
    //   window.location.href = "index.html";
    // });
  }
}

//close modal
function closeEmailCheck() {
  emailCheck.classList.replace("d-flex", "d-none");
}
