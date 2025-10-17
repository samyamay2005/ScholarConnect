const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    const tabId = tab.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");

    // Autofocus first input
    const firstInput = document.getElementById(tabId).querySelector("input");
    if (firstInput) firstInput.focus();
  });
});

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// Demo login actions
const STUDENT_KEY = "loggedInStudent";

document.getElementById("studentLoginBtn").addEventListener("click", () => {
  const email = document.getElementById("studentEmail").value;
  const password = document.getElementById("studentPassword").value;
  if(email && password) {
    localStorage.setItem(STUDENT_KEY, email);
    alert(`Logged in as student: ${email}`);
    window.location.href = "dashboard.html";
  } else {
    alert("Please fill in all fields");
  }
});

document.getElementById("signupBtn").addEventListener("click", () => {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirmPassword").value;
  if(name && email && pass && confirm) {
    if(pass !== confirm) {
      alert("Passwords do not match");
      return;
    }
    alert(`Account created for ${name}`);
  } else {
    alert("Please fill in all fields");
  }
});

document.getElementById("forgotBtn").addEventListener("click", () => {
  const email = document.getElementById("forgotEmail").value;
  if(email) {
    alert(`Password recovery email sent to ${email}`);
  } else {
    alert("Please enter your email");
  }
});

document.getElementById("adminLoginBtn").addEventListener("click", () => {
  const user = document.getElementById("adminUsername").value;
  const pass = document.getElementById("adminPassword").value;
  if(user && pass) {
    localStorage.setItem("loggedInAdmin", user);
    alert(`Admin logged in: ${user}`);
    window.location.href = "admin.html";
  } else {
    alert("Please fill in all fields");
  }
});