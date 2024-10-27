// Select the form element
const form = document.querySelector("form");

// Event listener for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture the values from the form fields
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    // Display the information in an alert
    alert(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    // Optional: Clear the form fields after submission
    form.reset();
});