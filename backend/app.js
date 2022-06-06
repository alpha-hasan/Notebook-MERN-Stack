const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
const port = 80;

app.use(express.json())

// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`NoteBook Backend listening at http://localhost:${port}`);
})