const minStudentNum = 202300000;
const maxStudentNum = 202399999;

let studentDir = [
    new Student("202301010", "Kent Olineg", "20", "keolineg@up.edu.ph", "BS Video Gaming"), 
    new Student("202309062", "Mark Alosim", "21", "mtalosim@up.edu.ph", "BA Food Appreciation"), 
    new Student("202312345", "Kenneth Rajidom", "19", "kgrajidom@up.edu.ph", "BS Computer Repair Shop"), 
    new Student("202363697", "Jasmine Nadagam", "20", "jgnadagam@up.edu.ph", "BS Installing and Downloading")
];

const errorHead = "Input Invalid:\n";

function Student(studentNumber, name, age, email, course){
    this.studentNumber = studentNumber;
    this.name = name;
    this.age = age;
    this.email = email;
    this.course = course;
}

function time_now(){
    let currentDate = new Date();

    let day = currentDate.toLocaleString('en-US', { weekday: 'long' });
    let date = currentDate.getDate();
    let month = currentDate.toLocaleString('en-US', { month: 'long' });
    let year = currentDate.getFullYear();
    let hour = currentDate.getHours(); 
    let minute = currentDate.getMinutes().toString();
    let period = (hour >= 12 ? "PM" : "AM");

    if (hour == 0) hour = 12;
    else if (hour > 12) hour -= 12;

    if (minute < 10) minute = "0" + minute;


    document.getElementById("currentDate").innerText = `Today is ${month} ${date}, ${year}, ${day}.`;
    document.getElementById("currentTime").innerText = `The current time is ${hour}:${minute} ${period}.`;
}

function generateUniqueStudentNumber() {
    let candidateStudentNumber;
    let validStudentNumberFound = false;

    while (!validStudentNumberFound) {
        candidateStudentNumber = Math.floor(Math.random() * (maxStudentNum - minStudentNum + 1)) + minStudentNum;

        let duplicateFound = studentDir.some(student => student.studentNumber == candidateStudentNumber);

        if (!duplicateFound) {
            validStudentNumberFound = true;
        }
    }
    return candidateStudentNumber.toString();
}

function validateStudent(name, age, email) {
    let errorMessage = errorHead;

    if (name.length <= 5 || !/\s/.test(name)) {
        errorMessage += " - Name must be more than 5 characters and contain a space.\n";
    }

    let parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 99) {
        errorMessage += " - Age must be a number between 18 and 99.\n";
    }

    if (!email.endsWith("@up.edu.ph")) {
        errorMessage += " - Email must end with @up.edu.ph.\n";
    }

    return errorMessage;
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".studentRegister").addEventListener("submit", add_student);
    document.querySelector(".studentSearch").addEventListener("submit", find_student);
});

function add_student(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newStudentName = formData.get("name").trim();
    const newStudentAge = formData.get("age");
    const newStudentEmail = formData.get("email");
    const newStudentCourse = formData.get("course");


    const errorMessage = validateStudent(newStudentName, newStudentAge, newStudentEmail);
    if (errorMessage != errorHead) {
        alert(errorMessage);
        return;
    }


    const newStudentNumber = generateUniqueStudentNumber();
    const newStudent = new Student(
        newStudentNumber,
        newStudentName,
        newStudentAge,
        newStudentEmail,
        newStudentCourse
    );

    studentDir.push(newStudent);

    alert(`Student ${newStudentName} added successfully with ID ${newStudentNumber}`);
    
    document.getElementById('nameInput').value = '';
    document.getElementById('ageInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('courseInput').value = 'BA Food Appreciation';
}

function display_list(){
    document.getElementById('allStudentTableContainer').innerHTML = "";

    const tableContainer = document.getElementById('allStudentTableContainer');
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Student Number</th>
        <th>Name</th>
        <th>Age</th>
        <th>Email Address</th>
        <th>Course</th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    studentDir.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.studentNumber}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    tableContainer.appendChild(table);
}

function displayStudent(student){
    let currentRow = document.getElementById("studentDisplayTable").insertRow();

    currentRow.insertCell().outerHTML = `<td class="allStudentNum">${student.studentNumber}</td>`;
    currentRow.insertCell().outerHTML = `<td class="allName">${student.name}</td>`;
    currentRow.insertCell().outerHTML = `<td class="allAge">${student.age}</td>`;
    currentRow.insertCell().outerHTML = `<td class="allEmail">${student.email}</td>`;
    currentRow.insertCell().outerHTML = `<td class="allCourse">${student.course}</td>`;
}

// Minmin : code assistance by ChatGPT, OpenAI, April 3, 2025, https://chatgpt.com/c/67eea4e1-7724-8005-8dcd-b6e2bcc3b511

function find_student(event){
    event.preventDefault();

    const sNumberData = document.getElementById("searchInput").value.trim();

    if (sNumberData === ""){
        document.getElementById("searchStatus").innerText = "Please enter a student number to search.";
        return;
    }

    let student_is_found = studentDir.find(student => student.studentNumber == sNumberData);
    let table = document.getElementById("studentSearchTable");
    table.innerHTML = "";

    if (student_is_found){
        table.innerHTML = `Student Found:
            <tr><th>Student Number</th><td>${student_is_found.studentNumber}</td></tr>
            <tr><th>Name</th><td>${student_is_found.name}</td></tr>
            <tr><th>Age</th><td>${student_is_found.age}</td></tr>
            <tr><th>Email</th><td>${student_is_found.email}</td></tr>
            <tr><th>Course</th><td>${student_is_found.course}</td></tr>
    `;
    } else {
        document.getElementById("searchStatus").innerText = "Student record does not exist.";
    }
}