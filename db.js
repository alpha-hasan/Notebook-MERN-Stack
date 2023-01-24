require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URI; // Local Connection : "mongodb://localhost:27017/noteBook"

const connectToMongo = async () => {
    try {
        mongoose.connect(mongoURI, () => {
            console.log('DB Connection Established Successfully!');
        })
    } catch (error) {
        console.log('Error: ', error);
    }
}
module.exports = connectToMongo;