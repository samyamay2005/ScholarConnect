// DEMO: Simple login simulation
let loggedIn = false; // Change to true to simulate logged-in user

// Demo scholarships
const scholarships = [
  {name:"Inspire Scholarship", provider:"Government of India", country:"India", degree:"Undergraduate", category:"STEM", gpa:3.5},
  {name:"Global Arts Grant", provider:"UK Arts Council", country:"UK", degree:"Postgraduate", category:"Arts", gpa:3.0},
  {name:"Tech Innovators Award", provider:"MIT", country:"USA", degree:"Undergraduate", category:"STEM", gpa:4.0},
  {name:"Commerce Excellence Scholarship", provider:"Harvard Business School", country:"USA", degree:"Postgraduate", category:"Commerce", gpa:3.5},
  {name:"Canadian Merit Scholarship", provider:"University of Toronto", country:"Canada", degree:"Undergraduate", category:"General", gpa:3.0}
];

// DOM Elements
const searchInput = document.getElementById("searchInput");
const countryFilter = document.getElementById("countryFilter");
const degreeFilter = document.getElementById("degreeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const gpaFilter = document.getElementById("gpaFilter");
const resultsContainer = document.getElementById("scholarshipResults");

// Render scholarships
function renderScholarships(list) {
  resultsContainer.innerHTML = "";
  if(list.length === 0) {
    resultsContainer.innerHTML = "<p>No scholarships found.</p>";
    return;
  }

  list.forEach((sch) => {
    const card = document.createElement("div");
    card.classList.add("scholarship-card", "card");
    card.innerHTML = `
      <h3>${sch.name}</h3>
      <p><strong>Provider:</strong> ${sch.provider}</p>
      <p><strong>Country:</strong> ${sch.country}</p>
      <p><strong>Degree:</strong> ${sch.degree}</p>
      <p><strong>Category:</strong> ${sch.category}</p>
      <p><strong>Minimum GPA:</strong> ${sch.gpa}</p>
      <button class="apply-btn">Apply Now</button>
    `;
    resultsContainer.appendChild(card);

    // Apply button logic
    const applyBtn = card.querySelector(".apply-btn");
    applyBtn.addEventListener("click", () => {
      if(!loggedIn) {
        alert("Please log in to apply for this scholarship.");
      } else {
        alert(`You have applied for ${sch.name}!`);
      }
    });
  });
}

// Filter function
function filterScholarships() {
  const term = searchInput.value.toLowerCase();
  const country = countryFilter.value;
  const degree = degreeFilter.value;
  const category = categoryFilter.value;
  const gpa = parseFloat(gpaFilter.value);

  const filtered = scholarships.filter((sch) => {
    const matchSearch = sch.name.toLowerCase().includes(term) || sch.provider.toLowerCase().includes(term);
    const matchCountry = country === "" || sch.country === country;
    const matchDegree = degree === "" || sch.degree === degree;
    const matchCategory = category === "" || sch.category === category;
    const matchGpa = isNaN(gpa) || sch.gpa >= gpa;

    return matchSearch && matchCountry && matchDegree && matchCategory && matchGpa;
  });

  renderScholarships(filtered);
}

// Event listeners
searchInput.addEventListener("input", filterScholarships);
countryFilter.addEventListener("change", filterScholarships);
degreeFilter.addEventListener("change", filterScholarships);
categoryFilter.addEventListener("change", filterScholarships);
gpaFilter.addEventListener("change", filterScholarships);

// Initial render
renderScholarships(scholarships);
// simple fetch with query params
async function loadScholarships(query = {}) {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`http://localhost:5000/api/scholarships?${params}`);
  const data = await res.json();
  renderScholarships(data); // your existing renderer
}
async function applyScholarship(userId, scholarshipId) {
  const res = await fetch('http://localhost:5000/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, scholarshipId })
  });
  const { applyUrl, application } = await res.json();
  // store application info locally if you want
  // redirect user to official apply page:
  window.open(applyUrl, '_blank'); // opens provider link
}

