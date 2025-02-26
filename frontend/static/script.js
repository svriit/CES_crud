// API Endpoints
const API_ENDPOINTS = {
    ADD_STUDENT: 'https://b31i1zxvcd.execute-api.ap-south-1.amazonaws.com/prod/students',
    GET_STUDENTS: 'https://fabj02e95h.execute-api.ap-south-1.amazonaws.com/prod/students'
};

// Add Student Form Handler
document.getElementById("studentForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const studentData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        };

        const response = await fetch(API_ENDPOINTS.ADD_STUDENT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();
        
        if (response.ok) {
            alert("Student added successfully!");
            this.reset();
            fetchStudents();
        } else {
            throw new Error(result.error || 'Failed to add student');
        }
    } catch (error) {
        console.error("Error adding student:", error);
        alert(`Failed to add student: ${error.message}`);
    } finally {
        submitButton.disabled = false;
    }
});

// Fetch Students Function
async function fetchStudents() {
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = '<li>Loading students...</li>';

    try {
        const response = await fetch(API_ENDPOINTS.GET_STUDENTS, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const students = await response.json();
        
        if (!response.ok) {
            throw new Error(students.error || 'Failed to fetch students');
        }

        if (students.length === 0) {
            studentList.innerHTML = '<li>No students found</li>';
            return;
        }

        studentList.innerHTML = students
            .map(student => `
                <li class="student-item">
                    <div class="student-info">
                        <strong>${student.name}</strong>
                        <span>${student.email}</span>
                    </div>
                </li>
            `)
            .join('');
    } catch (error) {
        console.error("Error fetching students:", error);
        studentList.innerHTML = `<li class="error">Error loading students: ${error.message}</li>`;
    }
}

// Initial load of students
document.addEventListener('DOMContentLoaded', fetchStudents);
