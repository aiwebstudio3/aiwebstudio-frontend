const API = "http://localhost:5000/api/admin";

/* ================= ADMIN LOGIN ================= */
if (document.getElementById("adminLoginForm")) {
  document.getElementById("adminLoginForm").onsubmit = async (e) => {
    e.preventDefault();

    error.innerText = "";

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });

      const data = await res.json();

      if (!res.ok) {
        error.innerText = data.message || "Login failed";
        return;
      }

      localStorage.setItem("adminToken", data.token);
      window.location.href = "admin-dashboard.html";

    } catch (err) {
      error.innerText = "Server error. Try again.";
    }
  };
}

/* ================= PROTECT DASHBOARD ================= */
if (window.location.pathname.includes("admin-dashboard")) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    window.location.href = "admin-login.html";
  } else {
    loadAdminData();
  }
}

/* ================= LOAD DATA ================= */
async function loadAdminData() {
  const token = localStorage.getItem("adminToken");

  /* BOOKINGS */
  const bookings = await fetch(`${API}/bookings`, {
    headers: { Authorization: token }
  }).then(res => res.json());

  document.getElementById("bookings").innerHTML =
    bookings.length
      ? bookings.map(b => `
        <div class="card">
          <strong>${b.name}</strong> – ${b.service}<br>
          <span class="small">${b.email} | ${b.phone}</span><br>
          <span class="small">${new Date(b.createdAt).toLocaleString()}</span>
        </div>
      `).join("")
      : "<p>No bookings yet.</p>";

  /* MESSAGES */
  const messages = await fetch(`${API}/messages`, {
    headers: { Authorization: token }
  }).then(res => res.json());

  document.getElementById("messages").innerHTML =
    messages.length
      ? messages.map(m => `
        <div class="card">
          <strong>${m.name}</strong><br>
          <span class="small">${m.email}</span><br><br>
          ${m.message}
        </div>
      `).join("")
      : "<p>No messages yet.</p>";
}

/* ================= LOGOUT ================= */
function adminLogout() {
  localStorage.removeItem("adminToken");
  window.location.href = "admin-login.html";
}
