const minStudentNum = 202300000;
const maxStudentNum = 202399999;

let studentDir = [
    new Student("202301010", "Kent Olineg", "20", "keolineg@up.edu.ph", "BS Video Gaming"), 
    new Student("202309062", "Mark Alosim", "21", "mtalosim@up.edu.ph", "BA Food Appreciation"), 
    new Student("202312345", "Kenneth Rajidom", "19", "kgrajidom@up.edu.ph", "BS Computer Repair Shop"), 
    new Student("202363697", "Jasmine Nadagam", "20", "jgnadagam@up.edu.ph", "BS Installing and Downloading")
];

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
    if (name.length <= 5 || !/\s/.test(name)) {
        return "Name must be more than 5 characters and contain a space.";
    }

    let parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 99) {
        return "Age must be a number between 18 and 99.";
    }

    if (!email.endsWith("@up.edu.ph")) {
        return "Email must end with @up.edu.ph.";
    }

    return null;
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
    if (errorMessage) {
        document.getElementById("submissionStatus").innerText = errorMessage;
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

    document.getElementById("submissionStatus").innerText = `Student ${newStudentName} added successfully with ID ${newStudentNumber}`;
}

function find_student(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const targetNumber = parseInt(formData.get("searchInput"));

    let displayStatus = document.getElementById("searchStatus");
    let displayTable = document.getElementById("studentSearchTable");

    displayStatus.innerHTML = "";
    displayTable.innerHTML = "";


    if (targetNumber < minStudentNum || targetNumber > maxStudentNum){
        displayStatus.innerHTML = "Error: Invalid Student Number";
        return;
    }

    for (let i = 0; i < studentDir.length; i++){
        if (studentDir[i].studentNumber == targetNumber){
            insertStudentDetails(displayTable, studentDir[i]);
            return
        }
    }

    displayStatus.innerHTML = "Error: Invalid Student Number";
}

function insertStudentDetails(displayTable, student){
    studentNumberRow = displayTable.insertRow();
    setSearchTableRow(studentNumberRow, "Student Number", student.studentNumber)

    nameRow = displayTable.insertRow();
    setSearchTableRow(nameRow, "Name", student.name)

    ageRow = displayTable.insertRow();
    setSearchTableRow(ageRow, "Age", student.age)

    emailRow = displayTable.insertRow();
    setSearchTableRow(emailRow, "Email", student.email)

    courseRow = displayTable.insertRow();
    setSearchTableRow(courseRow, "Course", student.course)
}

function setSearchTableRow(row, header, data){
    row.insertCell().outerHTML = `<th>${header}</th>`;
    row.insertCell().outerHTML = `<td>${data}</td>`;
}

function display_list(){
    let displayTable = document.getElementById("studentDisplayTable");

    displayTable.innerText = "";
    let headers = displayTable.insertRow();
    
    headers.insertCell().outerHTML = "<th>Student Number</th>";
    headers.insertCell().outerHTML = "<th>Name</th>";
    headers.insertCell().outerHTML = "<th>Age</th>";
    headers.insertCell().outerHTML = "<th>Email Address</th>";
    headers.insertCell().outerHTML = "<th>Course</th>";

    studentDir.forEach(displayStudent);
}


function displayStudent(student){
    let currentRow = document.getElementById("studentDisplayTable").insertRow();

    currentRow.insertCell().outerHTML = `<td>${student.studentNumber}</td>`;
    currentRow.insertCell().outerHTML = `<td>${student.name}</td>`;
    currentRow.insertCell().outerHTML = `<td>${student.age}</td>`;
    currentRow.insertCell().outerHTML = `<td>${student.email}</td>`;
    currentRow.insertCell().outerHTML = `<td>${student.course}</td>`;
}

