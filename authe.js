// -------- REGISTER --------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearRegisterErrors();

    const email = regEmail.value.trim();
    const password = regPassword.value;
    const confirm = regConfirm.value;

    let valid = true;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!email.includes("@")) {
      showError("regEmailError", "Enter valid email");
      valid = false;
    }

    if (password.length < 6) {
      showError("regPasswordError", "Min 6 characters");
      valid = false;
    }

    if (password !== confirm) {
      showError("regConfirmError", "Passwords do not match");
      valid = false;
    }

    if (users.some(u => u.email === email)) {
      showError("regEmailError", "Email already exists");
      valid = false;
    }

    if (!valid) return;

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "auth.html";
  });
}

// -------- LOGIN --------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearLoginErrors();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!email) {
      showError("loginEmailError", "Email required");
      return;
    }

    if (!password) {
      showError("loginPasswordError", "Password required");
      return;
    }

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      showError("loginPasswordError", "Invalid credentials");
      return;
    }

    alert("Login successful!");
  });
}

// -------- HELPERS --------
function showError(id, msg) {
  document.getElementById(id).innerText = msg;
}

function clearRegisterErrors() {
  ["regEmailError", "regPasswordError", "regConfirmError"]
    .forEach(id => document.getElementById(id).innerText = "");
}

function clearLoginErrors() {
  ["loginEmailError", "loginPasswordError"]
    .forEach(id => document.getElementById(id).innerText = "");
}

// -------- PASSWORD TOGGLE --------
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}
