
function toggleForms() {
  const login = document.getElementById('login-container');
  const register = document.getElementById('register-container');
  login.style.display = login.style.display === 'none' ? 'block' : 'none';
  register.style.display = register.style.display === 'none' ? 'block' : 'none';
}

function showNotification(message, isError = false) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.backgroundColor = isError ? "#dc3545" : "#28a745";
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    }),
  });
  const result = await res.json();
  showNotification(result.message, !res.ok);
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    }),
  });
  const result = await res.json();
  if (res.ok) {
    showNotification("Login successful!");
    setTimeout(() => window.location.href = "/feedback.html", 1500);
  } else {
    showNotification(result.message, true);
  }
});
