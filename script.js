/*
  File: script.js
  Author: CS100 Team
  Date Created: 23 July 2023
  Copyright: CSTU
  Description: JS code of CSTU Passport that validate with HTML5
*/

// Function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Extract form data using FormData
  const formData = new FormData(event.target);

  // Loop through the form data and log each field's name and value
  for (const [name, value] of formData) {
    console.log(name, value);
  }

  // Reset the form after submission
  document.getElementById("myForm").reset();
}

// Attach a submit event listener to the form
document.getElementById("myForm").addEventListener("submit", submitForm);
