/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with JS
*/

const config = {
  // backendUrl: "http://54.179.42.49/", // Default backend URL
  // backendUrl: "https://d1npkyc4r380kx.cloudfront.net/", // Default backend URL
  backendUrl: "https://d1a6370uhsfk5w.cloudfront.net/", // Default backend URL
};

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const fullnamePattern = /[A-Za-z]+\s[A-za-z]+$/ ;
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2 || !fullnamePattern.test(fullnameInput.value)) {
    errorElement.textContent = "Please enter both your Firstname and Lastname in English.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^6609\d{6}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID start with 6609." ;
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}


// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.*[a-z]{3}@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(config.backendUrl + "getActivityType");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    nickname: formData.get("nickname"),
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(config.backendUrl + "record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

  // Get form data
  var nickname = document.getElementById('nickname').value;
  var fullname = document.getElementById('fullname').value;
  var studentID = document.getElementById('studentID').value;
  var email = document.getElementById('email').value;
  var workTitle = document.getElementById('workTitle').value;
  var activityType = document.getElementById('activityType').value;
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;
  var description = document.getElementById('description').value;
  let submitBtn = document.getElementById("submit");

/*document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();



  // Display the submitted data
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '<h2><center>Submitted Data</h2>' +
                        '<p style = "margin-left:5%"><strong>Nickname:</strong> ' + nickname + '</p>' +
                        '<p id = "pp" ><strong>Full Name:</strong> ' + fullname + '</p>' +
                        '<p><strong>Student ID:</strong> ' + studentID + '</p>' +
                        '<p><strong>Email:</strong> ' + email + '</p>'+
                        '<p><strong>Title:</strong> ' + workTitle + '</p>' +
                        '<p><strong>Activity type:</strong> ' + activityType + '</p>' +
                        '<p><strong>start date:</strong> ' + startDate+ '</p>' +
                        '<p><strong>end date:</strong> ' + endDate + '</p>' +
                        '<p><strong>description:</strong> ' + description + '</p>' ;
});*/

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);


submitBtn.addEventListener("mouseover", () => {
  //If either password or username is invalid then do this..
  if (!validateName() || !validateStudentID() || !validateEmail()) {
    //Get the current position of submit btn
    let containerRect = document.querySelector(".form-container").getBoundingClientRect();
    let submitRect = document.getElementById("submit").getBoundingClientRect();
    let offset = submitRect.left - containerRect.left;
    console.log(offset);
    //If the button is on the left hand side.. move it to the the right hand side
    if (offset <= 200) {
      submitBtn.style.transform = "translateX(20em)";
    }
    //Vice versa
    else {
      submitBtn.style.transform = "translateX(0)";
    }
  }
});


