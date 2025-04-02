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

function display_list(){
    currentRow = document.getElementById("studentTable").innerText = ""
    currentRow = document.getElementById("studentTable").insertRow()

    currentRow.insertCell().innerText = "Student Number"
    currentRow.insertCell().innerText = "Name"
    currentRow.insertCell().innerText = "Age"
    currentRow.insertCell().innerText = "Email Address"
    currentRow.insertCell().innerText = "Course"

    studentDir.forEach(displayStudent)
}


function displayStudent(student){
    currentRow = document.getElementById("studentTable").insertRow()

    currentRow.insertCell().innerText = student.studentNumber
    currentRow.insertCell().innerText = student.name
    currentRow.insertCell().innerText = student.age
    currentRow.insertCell().innerText = student.email
    currentRow.insertCell().innerText = student.course
}

document.getElementById("studentDisplay").onclick =display_list