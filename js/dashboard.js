// Demo data
const appliedScholarships = [
  "Inspire Scholarship",
  "Global Arts Grant",
  "Tech Innovators Award"
];

const upcomingExams = [
  {name: "Inspire Scholarship Exam", date: "2025-11-20"},
  {name: "Tech Innovators Online Test", date: "2025-11-25"},
  {name: "Global Arts Submission", date: "2025-11-28"}
];

const scholarshipDeadlines = [
  {name: "Inspire Scholarship", date: "2025-11-20"},
  {name: "Tech Innovators Award", date: "2025-11-25"},
  {name: "Global Arts Grant", date: "2025-11-28"}
];

// Populate Applied Scholarships
const appliedList = document.getElementById("appliedList");
appliedScholarships.forEach(s => {
  const li = document.createElement("li");
  li.textContent = s;
  appliedList.appendChild(li);
});

// Populate Upcoming Exams
const examList = document.getElementById("examList");
upcomingExams.forEach(exam => {
  const li = document.createElement("li");
  li.textContent = `${exam.name} - ${exam.date}`;
  examList.appendChild(li);
});

// Simple Calendar Generation for current month
function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month+1, 0).getDate();

  let html = "<tr>";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(d => html += `<th>${d}</th>`);
  html += "</tr><tr>";

  // Empty cells before first day
  for(let i=0; i<firstDay; i++) html += "<td></td>";

  for(let day=1; day<=daysInMonth; day++) {
    const fullDate = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const isDeadline = scholarshipDeadlines.some(s => s.date === fullDate);
    html += `<td class="${isDeadline ? "deadline" : ""}">${day}</td>`;
    if((day+firstDay)%7 === 0) html += "</tr><tr>";
  }

  html += "</tr>";
  calendar.innerHTML = html;
}

generateCalendar();
