
const TOKEN_KEY = "token";
const AUTH_BASE = "/api/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// at least 8 characters, at least one letter and one number
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const profileBtn = document.getElementById("profileBtn");

function updateAuthUI() {
  const loggedIn = !!localStorage.getItem(TOKEN_KEY);

  if (loginBtn) loginBtn.classList.toggle("d-none", loggedIn);
  if (logoutBtn) logoutBtn.classList.toggle("d-none", !loggedIn);
  if (profileBtn) profileBtn.classList.toggle("d-none", !loggedIn);
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el || !window.bootstrap) return;
  const instance = bootstrap.Modal.getInstance(el);
  if (instance) instance.hide();
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  updateAuthUI();
  closeModal("profileModal");
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);

const modalLogoutBtn = document.getElementById("modalLogoutBtn");
if (modalLogoutBtn) modalLogoutBtn.addEventListener("click", logout);

// --- Switch between the Login view and the Register view inside the modal ---
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const authModalTitle = document.getElementById("authModalTitle");
const showRegisterLink = document.getElementById("showRegisterLink");
const showLoginLink = document.getElementById("showLoginLink");

function showRegisterView() {
  if (!loginView || !registerView) return;
  loginView.classList.add("d-none");
  registerView.classList.remove("d-none");
  if (authModalTitle) authModalTitle.textContent = "Sign Up";
}

function showLoginView() {
  if (!loginView || !registerView) return;
  registerView.classList.add("d-none");
  loginView.classList.remove("d-none");
  if (authModalTitle) authModalTitle.textContent = "Login";
}

if (showRegisterLink) {
  showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterView();
  });
}

if (showLoginLink) {
  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginView();
  });
}

// --- Login ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const msg = document.getElementById("loginMsg");

    msg.textContent = "";

    if (!emailRegex.test(email)) {
      msg.style.color = "red";
      msg.textContent = "Please enter a valid email address.";
      return;
    }
    if (!password) {
      msg.style.color = "red";
      msg.textContent = "Password is required.";
      return;
    }

    try {
      const res = await fetch(`${AUTH_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.style.color = "red";
        msg.textContent = data.message || "Login failed";
        return;
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      msg.style.color = "green";
      msg.textContent = "Login successful!";
      updateAuthUI();
      loginForm.reset();

      setTimeout(() => {
        closeModal("loginModal");
        msg.textContent = "";
      }, 700);
    } catch (err) {
      console.error("Login error:", err);
      msg.style.color = "red";
      msg.textContent = "Server error. Please try again.";
    }
  });
}

// --- Register ---
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;
    const msg = document.getElementById("registerMsg");

    msg.textContent = "";

    if (!emailRegex.test(email)) {
      msg.style.color = "red";
      msg.textContent = "Please enter a valid email address.";
      return;
    }
    if (!passwordRegex.test(password)) {
      msg.style.color = "red";
      msg.textContent = "Password must be at least 8 characters, with a letter and a number.";
      return;
    }
    if (password !== confirmPassword) {
      msg.style.color = "red";
      msg.textContent = "Passwords do not match.";
      return;
    }

    try {
      const res = await fetch(`${AUTH_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        msg.style.color = "red";
        msg.textContent = data.message || "Registration failed";
        return;
      }

      msg.style.color = "green";
      msg.textContent = "Account created! You can log in now.";
      registerForm.reset();

      setTimeout(() => {
        showLoginView();
        msg.textContent = "";
      }, 1000);
    } catch (err) {
      console.error("Register error:", err);
      msg.style.color = "red";
      msg.textContent = "Server error. Please try again.";
    }
  });
}

// --- Profile ---
if (profileBtn) {
  profileBtn.addEventListener("click", async () => {
    const loading = document.getElementById("profileLoading");
    const content = document.getElementById("profileContent");
    const msg = document.getElementById("profileMsg");

    if (!loading || !content) return;

    loading.classList.remove("d-none");
    content.classList.add("d-none");
    if (msg) msg.textContent = "";

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      logout();
      return;
    }

    try {
      const res = await fetch(`${AUTH_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        logout();
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        loading.classList.add("d-none");
        if (msg) msg.textContent = data.message || "Could not load profile.";
        return;
      }

      document.getElementById("profileEmail").textContent = data.user.email;
      document.getElementById("profileRole").textContent = data.user.role;
      document.getElementById("profileCreated").textContent = data.user.createdAt
        ? new Date(data.user.createdAt).toLocaleDateString()
        : "—";

      loading.classList.add("d-none");
      content.classList.remove("d-none");
    } catch (err) {
      console.error("Profile error:", err);
      loading.classList.add("d-none");
      if (msg) msg.textContent = "Server error. Please try again.";
    }
  });
}

updateAuthUI();
