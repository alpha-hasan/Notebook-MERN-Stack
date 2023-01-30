require('dotenv').config();
const path = require('path');
const connectToMongo = require('./db');

const express = require('express');
// const cors = require('cors');

const app = express();
// app.use(cors());

// Heroku port || Development port
const PORT = process.env.PORT || 80;

app.use(express.json());

// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Deployment Stuff

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "./client/build/")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    })
}

connectToMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`NoteBook Backend listening at http://localhost:${PORT}`);
    });
});