const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Hardcoded user credentials
const USERNAME = "admin";
const PASSWORD = "password123";

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        res.status(200).json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
