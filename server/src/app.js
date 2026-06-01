const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
    res.json({
        "message": "server is running"
    })
})

module.exports = app;