const BACKEND_BASE = "https://learn-student-site-backend.onrender.com/api";
const notice = document.getElementById("notice");

function showNotice(msg, ok = true) {
  notice.textContent = msg;
  notice.style.color = ok ? "green" : "red";
}

// DOM elements
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const welcomeScreen = document.getElementById("welcomeScreen");
const showSignup = document.getElementById("showSignup");
const showSignin = document.getElementById("showSignin");
const welcomeMsg = document.getElementById("welcomeMsg");

// Switch forms
showSignup.onclick = () => switchForm("signup");
showSignin.onclick = () => switchForm("signin");
function switchForm(form) {
  signinForm.classList.remove("active");
  signupForm.classList.remove("active");
  if (form === "signup") signupForm.classList.add("active");
  else signinForm.classList.add("active");
  showNotice("");
}

// Sign Up
document.getElementById("signupBtn").addEventListener("click", async () => {
  const name = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim().toLowerCase();
  const password = document.getElementById("suPassword").value;

  if (!name || !email || !password) return showNotice("All fields required", false);

  try {
    const res = await fetch(`${BACKEND_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      loadUser();
    } else showNotice(data.message, false);
  } catch {
    showNotice("Network error", false);
  }
});

// Sign In
document.getElementById("signinBtn").addEventListener("click", async () => {
  const email = document.getElementById("siEmail").value.trim().toLowerCase();
  const password = document.getElementById("siPassword").value;

  if (!email || !password) return showNotice("Enter email and password", false);

  try {
    const res = await fetch(`${BACKEND_BASE}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      loadUser();
    } else showNotice(data.message, false);
  } catch {
    showNotice("Network error", false);
  }
});

// Log Out
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  welcomeScreen.style.display = "none";
  signupForm.classList.add("active");
  showNotice("Logged out successfully");
});

// Load user session
function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    welcomeMsg.textContent = `Welcome, ${user.name}!`;
    signupForm.classList.remove("active");
    signinForm.classList.remove("active");
    welcomeScreen.style.display = "block";
  }
}

// Initialize
loadUser();
