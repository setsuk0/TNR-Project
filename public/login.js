// login.js

// Import the loginUser function
import { loginUser } from './network/network.js';

// Handle the form submission for login
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const data = await loginUser(username, password);
        if (data.message === 'Login successful!') {
            // If login is successful, hide login page and show map
            sessionStorage.setItem('loggedIn', 'true'); // Store login status
            window.location.href = 'index.html'; // Redirect to the main page
        }
    } catch (error) {
        document.getElementById('login-message').textContent = error.message;
    }
});
