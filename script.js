// script.js
const BACKEND_URL = "https://learn-student-site-backend.onrender.com/api/signup";

function showNotice(text, ok = true) {
  const n = document.getElementById('notice');
  n.textContent = text;
  n.style.color = ok ? 'green' : 'red';
}

const form = document.getElementById('signupForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
const toggle = document.getElementById('togglePwd');
const submitBtn = document.getElementById('submitBtn');
const pwdStrength = document.getElementById('pwdStrength');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function scorePassword(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

function setError(fieldName, message) {
  const el = document.querySelector(`small.error[data-for="${fieldName}"]`);
  if (el) el.textContent = message || '';
}

function clearErrors() {
  document.querySelectorAll('small.error').forEach(s => s.textContent = '');
}

password.addEventListener('input', () => {
  pwdStrength.value = scorePassword(password.value);
});

toggle.addEventListener('click', () => {
  const t = password.type === 'password' ? 'text' : 'password';
  password.type = t; confirm.type = t;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();
  showNotice('');

  const nameVal = fullname.value.trim();
  const emailVal = email.value.trim().toLowerCase();
  const pwd = password.value;
  const conf = confirm.value;
  let valid = true;

  if (nameVal.length < 2) { setError('fullname', 'Enter your full name'); valid = false; }
  if (!emailRegex.test(emailVal)) { setError('email', 'Invalid email'); valid = false; }
  if (pwd.length < 8) { setError('password', 'Minimum 8 characters'); valid = false; }
  if (pwd !== conf) { setError('confirm', 'Passwords do not match'); valid = false; }

  if (!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating...';

  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameVal, email: emailVal, password: pwd })
    });

    const data = await res.json();
    if (res.ok) {
      showNotice(data.message || 'Account created successfully!');
      form.reset();
      pwdStrength.value = 0;
    } else {
      showNotice(data.message || 'Signup failed', false);
    }
  } catch (err) {
    console.error(err);
    showNotice('Network error. Please try again later.', false);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create account';
  }
});
