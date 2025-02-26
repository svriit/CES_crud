document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    fetch("/add_student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchStudents();
    })
    .catch(error => console.error("Error:", error));
});

function fetchStudents() {
    fetch("/get_students")
    .then(response => response.json())
    .then(data => {
        let studentList = document.getElementById("studentList");
        studentList.innerHTML = "";
        data.forEach(student => {
            let li = document.createElement("li");
            li.textContent = `${student.name} - ${student.email}`;
            studentList.appendChild(li);
        });
    })
    .catch(error => console.error("Error:", error));
}
