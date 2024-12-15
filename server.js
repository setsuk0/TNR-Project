const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Hardcoded user credentials
const USERNAME = "admin";
const PASSWORD = "password123";

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate credentials
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
