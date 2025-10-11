// Redirect if not admin logged in
if(!localStorage.getItem("loggedInAdmin")) {
  alert("Admin login required!");
  window.location.href = "login.html";
}

// Demo scholarships array
let scholarships = [
  {name: "Inspire Scholarship", provider: "Govt", deadline: "2025-11-20"},
  {name: "Global Arts Grant", provider: "Arts Foundation", deadline: "2025-11-28"}
];

const listEl = document.getElementById("scholarshipList");

function renderList() {
  listEl.innerHTML = "";
  scholarships.forEach((s, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${s.name} - ${s.provider} (Deadline: ${s.deadline})
      <span>
        <button onclick="editScholarship(${index})">Edit</button>
        <button onclick="deleteScholarship(${index})">Delete</button>
      </span>
    `;
    listEl.appendChild(li);
  });
}

renderList();

// Add new scholarship
document.getElementById("addScholarshipBtn").addEventListener("click", () => {
  const name = document.getElementById("scholarshipName").value;
  const provider = document.getElementById("providerName").value;
  const deadline = document.getElementById("deadline").value;

  if(name && provider && deadline) {
    scholarships.push({name, provider, deadline});
    renderList();
    alert("Scholarship added!");
  } else {
    alert("Fill all fields!");
  }
});

// Edit scholarship
window.editScholarship = (index) => {
  const s = scholarships[index];
  const newName = prompt("Scholarship Name:", s.name);
  const newProvider = prompt("Provider:", s.provider);
  const newDeadline = prompt("Deadline:", s.deadline);

  if(newName && newProvider && newDeadline) {
    scholarships[index] = {name: newName, provider: newProvider, deadline: newDeadline};
    renderList();
    alert("Updated!");
  }
}

// Delete scholarship
window.deleteScholarship = (index) => {
  if(confirm("Are you sure you want to delete this scholarship?")) {
    scholarships.splice(index, 1);
    renderList();
  }
}
