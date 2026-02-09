const AUTH_API = "/api/auth/login";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

function updateAuthUI() {
  const token = localStorage.getItem("token");
  if (token) {
    loginBtn.classList.add("d-none");
    logoutBtn.classList.remove("d-none");
  } else {
    loginBtn.classList.remove("d-none");
    logoutBtn.classList.add("d-none");
  }
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;
  const msg = document.getElementById("loginMsg");

  try {
    const res = await fetch(AUTH_API, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message || "Login failed";
      msg.style.color = "red";
      return;
    }

    localStorage.setItem("token", data.token);
    msg.textContent = "Login successful!";
    msg.style.color = "green";

    setTimeout(() => {
      const modal = document.getElementById("loginModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
      updateAuthUI();
    }, 800);

  } catch (err) {
    console.error("Login error:", err);
    msg.textContent = "Server error";
    msg.style.color = "red";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  updateAuthUI();
});

updateAuthUI();