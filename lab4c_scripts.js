function time_now(){
    let currentDate = new Date();

    let day = currentDate.toLocaleString('en-US', { weekday: 'long' });
    let date = currentDate.getDate();
    let month = currentDate.toLocaleString('en-US', { month: 'long' });
    let year = currentDate.getFullYear();
    let hour = currentDate.getHours(); 
    let minute = currentDate.getMinutes();
    let period = (hour >= 12 ? "PM" : "AM");

    if (hour == 0) hour = 12;
    else if (hour > 12) hour -= 12;


    document.getElementById("currentDate").innerText = "Today is " + month + " " + date + ", " + year + ", " + day + ".";
    document.getElementById("currentTime").innerText = "The current time is " + hour + ":" + minute + " " + period + ".";
}

function Student(studentNumber, name, age, email, course){
    this.studentNumber = studentNumber;
    this.name = name;
    this.age = age;
    this.email = email;
    this.course = course;
}

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);

    const student = new Student(
        formData.get("studentNumber"),
        formData.get("name"),
        formData.get("age"),
        formData.get("email"),
        formData.get("course")
    );
}