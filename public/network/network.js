// network/network.js

/**
 * Function to log in a user
 * @param {string} username - The username to log in with
 * @param {string} password - The password to log in with
 * @returns {Promise<object>} - The response from the server
 */
async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        // Parse the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}
