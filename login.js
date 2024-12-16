// Handle the form submission for login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to server
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error('Login failed'); // Handle server error
        }
        return response.json(); // Parse JSON data
    })
    .then(data => {
        if (data.message === "Login successful!") {
            // If login is successful, store login status and redirect to the main page
            sessionStorage.setItem('loggedIn', 'true'); // Store login status
            window.location.href = 'index.html'; // Redirect to the main page (map)
        } else {
            document.getElementById('login-message').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('login-message').textContent = 'Something went wrong. Please try again.';
    });
});
