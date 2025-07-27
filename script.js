const courseForm = document.getElementById('courseForm');
const courseList = document.getElementById('courseList');

function getCourses() {
  return JSON.parse(localStorage.getItem('courses')) || [];
}

function saveCourses(courses) {
  localStorage.setItem('courses', JSON.stringify(courses));
}

function addCourseToTable(course) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${course.name}</td>
    <td>${course.code}</td>
    <td>
      <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    </td>
  `;

  tr.querySelector('.delete-btn').addEventListener('click', () => {
    deleteCourse(course.code);
  });

  courseList.appendChild(tr);
}

function renderCourses() {
  courseList.innerHTML = '';
  const courses = getCourses();
  courses.forEach(addCourseToTable);
}

function deleteCourse(code) {
  const courses = getCourses().filter(course => course.code !== code);
  saveCourses(courses);
  renderCourses();
}

courseForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('courseName').value.trim();
  const code = document.getElementById('courseCode').value.trim();

  if (!name || !code) return;

  const newCourse = { name, code };
  const courses = getCourses();
  courses.push(newCourse);
  saveCourses(courses);
  renderCourses();

  courseForm.reset();
});

// Initialize on load
renderCourses();
