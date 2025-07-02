
function showNotification(message, isError = false) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.backgroundColor = isError ? "#dc3545" : "#28a745";
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const res = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      message: document.getElementById("message").value,
    }),
  });
  const result = await res.json();
  showNotification(result.message, !res.ok);
});
