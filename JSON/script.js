async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
}

function displaySchoolInfo(data) {
  const schoolDiv = document.getElementById("school-details");
  schoolDiv.innerHTML = `
      <p><strong>School Name:</strong> ${data.school_name}</p>
      <p><strong>Class:</strong> ${data.class}</p>
      <p><strong>President:</strong> ${data.info.president}</p>
      <p><strong>Address:</strong> ${data.info.address}</p>
      <p><strong>Email:</strong> ${data.info.contacts.email}</p>
      <p><strong>Tel:</strong> ${data.info.contacts.tel}</p>
    `;
}

function populateStudentDropdown(students) {
  const select = document.getElementById("student-select");
  students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = student.id;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const selectedId = select.value;
    const student = students.find((s) => s.id === selectedId);
    displayStudentDetails(student);
  });
}

function displayStudentDetails(student) {
  const detailDiv = document.getElementById("student-details");
  if (!student) {
    detailDiv.innerHTML = "";
    return;
  }

  const grades = Object.entries(student.grade)
    .map(([subject, mark]) => `<li>${subject}: ${mark}</li>`)
    .join("");

  detailDiv.innerHTML = `
      <p><strong>Name:</strong> ${student.name}</p>
      <ul><strong>Grades:</strong> ${grades}</ul>
    `;
}

async function loadAndDisplay() {
  const data = await fetchData();
  displaySchoolInfo(data);
  populateStudentDropdown(data.students);
}

loadAndDisplay();
