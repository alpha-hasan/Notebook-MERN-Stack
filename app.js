require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();

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

// Heroku Stuff

if (process.env.NODE_ENV == "production") {
    app.use(express.static("./frontend/build"));
}

app.listen(PORT, () => {
    console.log(`NoteBook Backend listening at http://localhost:${PORT}`);
})