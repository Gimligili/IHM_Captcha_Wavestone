document.addEventListener("DOMContentLoaded", function() {
    // Get a reference to the form and the submit button
    const loginForm = document.querySelector("form");
    const submitButton = document.querySelector("input[type='submit']");

    // Add an event listener for form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the entered username and password
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        // Perform client-side validation here if needed

        // Create a data object to send to the server
        const data = {
            username: username,
            password: password
        };

        // Make an AJAX request to your server for credential verification
        // You can use the Fetch API or any other AJAX library you prefer
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Credentials are valid, you can redirect or perform other actions
                console.log("Login successful!");
            } else {
                // Credentials are invalid, handle the error or show a message
                console.error("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
    });
});
